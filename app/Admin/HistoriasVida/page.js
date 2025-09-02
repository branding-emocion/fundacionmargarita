"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Eye, Calendar, User } from "lucide-react";
import Link from "next/link";
import HistoriaModal from "@/components/HistoriaModal";
import { historiasService } from "@/lib/historias";

export default function AdminHistoriasPage() {
  const [historias, setHistorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHistoria, setEditingHistoria] = useState(null);

  const loadHistorias = async () => {
    try {
      setLoading(true);
      const data = await historiasService.getAll();
      setHistorias(data);
    } catch (error) {
      toast("No se pudieron cargar las historias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistorias();
  }, []);

  const handleDelete = async (id, nombre) => {
    if (!confirm(`¿Estás seguro de eliminar la historia de ${nombre}?`)) {
      return;
    }

    try {
      await historiasService.delete(id);
      setHistorias((prev) => prev.filter((h) => h.id !== id));
      toast({
        title: "Historia eliminada",
        description: `La historia de ${nombre} ha sido eliminada exitosamente`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la historia",
        variant: "destructive",
      });
    }
  };

  const handleCreateNew = () => {
    setEditingHistoria(null);
    setIsModalOpen(true);
  };

  const handleEdit = (historia) => {
    setEditingHistoria(historia);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingHistoria(null);
    loadHistorias(); // Reload data after modal closes
  };

  const filteredHistorias = historias.filter(
    (historia) =>
      historia.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      historia.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              Administrar Historias
            </h1>
            <p className="text-muted-foreground">
              Gestiona las historias de éxito de los pacientes
            </p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={handleCreateNew}>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Historia
          </Button>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar por nombre del paciente o doctor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{historias.length}</p>
                  <p className="text-sm text-muted-foreground">
                    Total Historias
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mr-4">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {
                      historias.filter(
                        (h) =>
                          new Date(h.fechaCirugia).getFullYear() ===
                          new Date().getFullYear()
                      ).length
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">Este Año</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mr-4">
                  <Eye className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {filteredHistorias.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Mostrando</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historias List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHistorias.map((historia, index) => (
            <motion.div
              key={historia.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {historia.nombre}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {historia.edad}
                      </p>
                    </div>
                    <Badge variant="secondary">{historia.fechaCirugia}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {historia.resumen}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Dr. {historia.doctor}
                    </p>
                    <div className="flex gap-2">
                      <Link href={`/Historias/${historia.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(historia)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleDelete(historia.id, historia.nombre)
                        }
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredHistorias.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                No se encontraron historias
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? "Intenta con otros términos de búsqueda"
                  : "Aún no hay historias registradas"}
              </p>
              {!searchTerm && (
                <Button onClick={handleCreateNew}>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Primera Historia
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <HistoriaModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        historia={editingHistoria}
        isEditing={!!editingHistoria}
      />
    </div>
  );
}
