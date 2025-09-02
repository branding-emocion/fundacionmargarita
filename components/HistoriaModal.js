"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2, Upload, X, ImageIcon } from "lucide-react";
import { historiasService } from "@/lib/historias";
import { toast } from "sonner";

export default function HistoriaModal({
  isOpen,
  onClose,
  historia,
  isEditing = false,
}) {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    edad: "",
    resumen: "",
    historia: "",
    imagen: "",
    fechaCirugia: "",
    doctor: "",
    seguimiento: "",
  });

  useEffect(() => {
    if (historia) {
      setFormData({
        nombre: historia.nombre || "",
        edad: historia.edad || "",
        resumen: historia.resumen || "",
        historia: historia.historia || "",
        imagen: historia.imagen || "",
        fechaCirugia: historia.fechaCirugia || "",
        doctor: historia.doctor || "",
        seguimiento: historia.seguimiento || "",
      });
      if (historia.imagen) {
        setImagePreview(historia.imagen);
      }
    } else {
      setFormData({
        nombre: "",
        edad: "",
        resumen: "",
        historia: "",
        imagen: "",
        fechaCirugia: "",
        doctor: "",
        seguimiento: "",
      });
      setImagePreview(null);
      setImageFile(null);
    }
  }, [historia, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file) => {
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast("Por favor selecciona un archivo de imagen válido");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast("La imagen debe ser menor a 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleImageChange(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageChange(e.dataTransfer.files[0]);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, imagen: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nombre ||
      !formData.edad ||
      !formData.resumen ||
      !formData.historia
    ) {
      toast("Por favor completa todos los campos obligatorios");
      return;
    }

    setLoading(true);

    try {
      const finalFormData = { ...formData };

      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const imageUrl = await historiasService.uploadImage(
          imageFile,
          fileName
        );
        finalFormData.imagen = imageUrl;
      }

      if (isEditing && historia?.id) {
        if (imageFile && historia.imagen) {
          try {
            await historiasService.deleteImage(historia.imagen);
          } catch (error) {
            console.log("Error deleting old image:", error);
          }
        }

        await historiasService.update(historia.id, finalFormData);
        toast(
          `La historia de ${formData.nombre} ha sido actualizada exitosamente`
        );
      } else {
        await historiasService.create(finalFormData);
        toast(`La historia de ${formData.nombre} ha sido creada exitosamente`);
      }

      onClose();
    } catch (error) {
      toast(`No se pudo ${isEditing ? "actualizar" : "crear"} la historia`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {isEditing ? "Editar Historia" : "Nueva Historia"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del Paciente *</Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: María Elena"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edad">Edad *</Label>
              <Input
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                placeholder="Ej: 8 años"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resumen">Resumen de la Historia *</Label>
            <Textarea
              id="resumen"
              name="resumen"
              value={formData.resumen}
              onChange={handleChange}
              placeholder="Breve descripción de la historia del paciente..."
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="historia">Historia Completa *</Label>
            <Textarea
              id="historia"
              name="historia"
              value={formData.historia}
              onChange={handleChange}
              placeholder="Relata la historia completa del paciente, desde su llegada hasta su recuperación..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Imagen del Paciente</Label>

            {!imagePreview ? (
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                  dragActive ? "border-primary bg-primary/5" : "border-gray-300"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <ImageIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Arrastra una imagen o haz clic para seleccionar
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="imagen-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    document.getElementById("imagen-upload").click()
                  }
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Seleccionar Imagen
                </Button>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF hasta 5MB
                </p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="w-4 h-4" />
                </Button>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                    id="imagen-upload-replace"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("imagen-upload-replace").click()
                    }
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Cambiar Imagen
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fechaCirugia">Fecha de Cirugía</Label>
              <Input
                id="fechaCirugia"
                name="fechaCirugia"
                value={formData.fechaCirugia}
                onChange={handleChange}
                placeholder="Ej: Marzo 2023"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Input
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                placeholder="Nombre del doctor"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seguimiento">Seguimiento</Label>
            <Input
              id="seguimiento"
              name="seguimiento"
              value={formData.seguimiento}
              onChange={handleChange}
              placeholder="Ej: Controles regulares cada 6 meses"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isEditing ? "Actualizando..." : "Creando..."}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? "Actualizar Historia" : "Crear Historia"}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
