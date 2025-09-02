"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  ExternalLink,
  Search,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useAllianceStore } from "@/lib/alliance-store";
import { AllianceModal } from "@/components/alliance-moda";

export default function AdminAlianzasPage() {
  const { alliances, deleteAlliance, fetchAlliances, loading, error } =
    useAllianceStore();
  const [selectedAlliance, setSelectedAlliance] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [editingAlliance, setEditingAlliance] = useState(null);

  useEffect(() => {
    fetchAlliances();
  }, [fetchAlliances]);

  const handleDelete = async (id) => {
    try {
      await deleteAlliance(id);
      setSelectedAlliance(null);
    } catch (error) {
      console.error("Error deleting alliance:", error);
    }
  };

  const handleCreateNew = () => {
    setModalMode("create");
    setEditingAlliance(null);
    setModalOpen(true);
  };

  const handleEdit = (alliance) => {
    setModalMode("edit");
    setEditingAlliance(alliance);
    setModalOpen(true);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(dateObj);
  };

  const filteredAlliances = alliances.filter(
    (alliance) =>
      alliance.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alliance.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alliance.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && alliances.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando alianzas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">
            Error al cargar las alianzas: {error}
          </p>
          <Button onClick={() => fetchAlliances()}>Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">
                Administración de Alianzas
              </h1>
              <p className="text-muted-foreground">
                Gestiona las alianzas estratégicas de la fundación
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/Alianzas">
                <Eye className="w-4 h-4 mr-2" />
                Vista Pública
              </Link>
            </Button>
            <Button onClick={handleCreateNew} disabled={loading}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Alianza
            </Button>
          </div>
        </div>

        {/* Alliances Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Alianzas ({alliances.length})</CardTitle>
              {alliances.length > 0 && (
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar alianzas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {alliances.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No hay alianzas</h3>
                <p className="text-muted-foreground mb-4">
                  Comienza agregando tu primera alianza estratégica
                </p>
                <Button onClick={handleCreateNew}>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Primera Alianza
                </Button>
              </div>
            ) : filteredAlliances.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  No se encontraron resultados
                </h3>
                <p className="text-muted-foreground mb-4">
                  No hay alianzas que coincidan con "{searchTerm}"
                </p>
                <Button variant="outline" onClick={() => setSearchTerm("")}>
                  Limpiar búsqueda
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Logo</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Enlace</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlliances.map((alliance) => (
                      <TableRow key={alliance.id}>
                        <TableCell>
                          {alliance.logo ? (
                            <img
                              src={alliance.logo || "/placeholder.svg"}
                              alt={`Logo ${alliance.nombre}`}
                              className="w-12 h-8 object-contain rounded"
                            />
                          ) : (
                            <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">
                                Sin logo
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {alliance.nombre}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{alliance.tipo}</Badge>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <p className="truncate" title={alliance.descripcion}>
                            {alliance.descripcion}
                          </p>
                        </TableCell>
                        <TableCell>
                          {alliance.link ? (
                            <Button variant="ghost" size="sm" asChild>
                              <a
                                href={alliance.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          ) : (
                            <span className="text-muted-foreground text-sm">
                              Sin enlace
                            </span>
                          )}
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(alliance)}
                              disabled={loading}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedAlliance(alliance)}
                                  disabled={loading}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    ¿Eliminar alianza?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Se
                                    eliminará permanentemente la alianza "
                                    {selectedAlliance?.nombre}".
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      selectedAlliance &&
                                      handleDelete(selectedAlliance.id)
                                    }
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <AllianceModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          alliance={editingAlliance}
          mode={modalMode}
        />
      </div>
    </div>
  );
}
