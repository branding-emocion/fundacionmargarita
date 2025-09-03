"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save,
  X,
  Upload,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useLiveStream } from "@/hooks/useLiveStream";

export default function LiveStreamAdmin() {
  const {
    streams,
    addStream,
    updateStream,
    deleteStream,
    toggleStreamActive,
    loadStreamsFromFirebase,
    subscribeToStreams,
    uploadImage, // usando uploadImage del hook en lugar de importar desde firebase
    isLoading,
  } = useLiveStream();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStream, setEditingStream] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    bannerImage: "",
    isActive: false,
    activeDate: "",
  });

  useEffect(() => {
    loadStreamsFromFirebase();
    const unsubscribe = subscribeToStreams();
    return () => unsubscribe && unsubscribe();
  }, [loadStreamsFromFirebase, subscribeToStreams]);

  const resetForm = () => {
    setFormData({
      title: "",
      url: "",
      bannerImage: "",
      isActive: false,
      activeDate: "",
    });
    setEditingStream(null);
    setSelectedFile(null);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Crear preview local
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, bannerImage: previewUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.url.trim()) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    setSaving(true);
    try {
      const finalFormData = { ...formData };

      if (selectedFile) {
        setUploading(true);
        try {
          const imageUrl = await uploadImage(selectedFile);
          finalFormData.bannerImage = imageUrl;
        } catch (error) {
          alert("Error al subir la imagen: " + error.message);
          setSaving(false);
          setUploading(false);
          return;
        }
        setUploading(false);
      }

      if (editingStream) {
        await updateStream(editingStream.id, finalFormData);
      } else {
        await addStream(finalFormData);
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error al guardar el directo:", error);
      alert("Error al guardar el directo. Inténtalo de nuevo.");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  const handleEdit = (stream) => {
    setEditingStream(stream);
    setFormData({
      title: stream.title,
      url: stream.url,
      bannerImage: stream.bannerImage,
      isActive: stream.isActive,
      activeDate: stream.activeDate || "",
    });
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de que quieres eliminar este directo?")) {
      setDeleting(id);
      try {
        await deleteStream(id);
      } catch (error) {
        console.error("Error al eliminar el directo:", error);
        alert("Error al eliminar el directo. Inténtalo de nuevo.");
      } finally {
        setDeleting(null);
      }
    }
  };

  const activeStreamsCount = streams.filter((stream) => stream.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Panel de Administración
          </h2>
          <p className="text-muted-foreground">Gestiona tus directos en vivo</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Directo
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingStream ? "Editar Directo" : "Crear Nuevo Directo"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título del Directo</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Ej: Conferencia en vivo sobre tecnología"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL del Directo</Label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, url: e.target.value }))
                  }
                  placeholder="https://youtube.com/watch?v=..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activeDate">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Fecha de Activación
                </Label>
                <Input
                  id="activeDate"
                  type="date"
                  value={formData.activeDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      activeDate: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="banner">Imagen Banner</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      id="banner-file"
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      disabled={uploading || saving}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      disabled={uploading || saving}
                    >
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>

                  {formData.bannerImage && (
                    <div className="mt-2">
                      <img
                        src={formData.bannerImage || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded border"
                      />
                      {selectedFile && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Archivo seleccionado: {selectedFile.name} (se subirá
                          al guardar)
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 p-3 border border-border rounded-lg bg-muted/30">
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isActive: checked }))
                  }
                  className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300"
                />
                <Label htmlFor="active" className="font-medium">
                  {formData.isActive
                    ? "✅ Directo activo"
                    : "⭕ Directo inactivo"}
                </Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={uploading || saving}
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 animate-spin border-2 border-current border-t-transparent rounded-full mr-2" />
                      Subiendo imagen...
                    </>
                  ) : saving ? (
                    <>
                      <div className="w-4 h-4 animate-spin border-2 border-current border-t-transparent rounded-full mr-2" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      {editingStream ? "Actualizar" : "Crear"}
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={saving}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <div>
                <p className="text-2xl font-bold">{activeStreamsCount}</p>
                <p className="text-sm text-muted-foreground">
                  Directos Activos
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-2xl font-bold">{streams.length}</p>
              <p className="text-sm text-muted-foreground">Total de Directos</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div>
              <p className="text-2xl font-bold">
                {streams.length - activeStreamsCount}
              </p>
              <p className="text-sm text-muted-foreground">
                Directos Inactivos
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Streams List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Directos</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 animate-spin border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
              <p className="text-muted-foreground">Cargando directos...</p>
            </div>
          ) : streams.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No hay directos creados aún.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Haz clic en "Nuevo Directo" para comenzar.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {streams.map((stream) => (
                <div
                  key={stream.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    {stream.bannerImage && (
                      <img
                        src={stream.bannerImage || "/placeholder.svg"}
                        alt={stream.title}
                        className="w-16 h-12 object-cover rounded border"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground truncate">
                          {stream.title}
                        </h3>
                        <Badge
                          variant={stream.isActive ? "default" : "secondary"}
                        >
                          {stream.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {stream.url}
                      </p>
                      {stream.activeDate && (
                        <p className="text-xs text-muted-foreground">
                          📅 Fecha de activación:{" "}
                          {new Date(stream.activeDate).toLocaleDateString()}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Actualizado:{" "}
                        {new Date(stream.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleStreamActive(stream.id)}
                      className="h-8 w-8"
                    >
                      {stream.isActive ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(stream)}
                      className="h-8 w-8"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(stream.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      disabled={deleting === stream.id}
                    >
                      {deleting === stream.id ? (
                        <div className="w-4 h-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
