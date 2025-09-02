"use client";

import { useState, useEffect } from "react";
import { useAllianceStore } from "@/lib/alliance-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/image-upload";
import { Loader2 } from "lucide-react";

export function AllianceModal({ open, onOpenChange, alliance, mode }) {
  const { addAlliance, updateAlliance } = useAllianceStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    descripcion: "",
    logo: "",
    logoFile: null,
    link: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      if (mode === "edit" && alliance) {
        setFormData({
          nombre: alliance.nombre,
          tipo: alliance.tipo,
          descripcion: alliance.descripcion,
          logo: alliance.logo || "",
          logoFile: null,
          link: alliance.link || "",
        });
      } else {
        setFormData({
          nombre: "",
          tipo: "",
          descripcion: "",
          logo: "",
          logoFile: null,
          link: "",
        });
      }
      setErrors({});
    }
  }, [open, alliance, mode]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (!formData.tipo.trim()) {
      newErrors.tipo = "El tipo es requerido";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es requerida";
    }

    if (formData.link && !isValidUrl(formData.link)) {
      newErrors.link = "El enlace debe ser una URL válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const allianceData = {
        nombre: formData.nombre.trim(),
        tipo: formData.tipo.trim(),
        descripcion: formData.descripcion.trim(),
        link: formData.link.trim() || undefined,
        logoFile: formData.logoFile, // Pass the file for Firebase upload
        logo: formData.logo, // Keep existing logo URL for edits without new file
      };

      if (mode === "edit" && alliance) {
        await updateAlliance(alliance.id, allianceData);
      } else {
        await addAlliance(allianceData);
      }

      onOpenChange(false);
    } catch (error) {
      console.error("Error saving alliance:", error);
      setErrors({ submit: "Error al guardar la alianza. Inténtalo de nuevo." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (imageData, file) => {
    setFormData((prev) => ({
      ...prev,
      logo: imageData || "",
      logoFile: file || null,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Editar Alianza" : "Nueva Alianza"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Modifica los datos de la alianza estratégica."
              : "Completa la información para crear una nueva alianza estratégica."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, nombre: e.target.value }))
                }
                placeholder="Nombre de la organización"
                className={errors.nombre ? "border-destructive" : ""}
              />
              {errors.nombre && (
                <p className="text-sm text-destructive">{errors.nombre}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo *</Label>
              <Select
                value={formData.tipo}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, tipo: value }))
                }
              >
                <SelectTrigger
                  className={errors.tipo ? "border-destructive" : ""}
                >
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Estratégica">Estratégica</SelectItem>
                  <SelectItem value="Académica">Académica</SelectItem>
                  <SelectItem value="Gubernamental">Gubernamental</SelectItem>
                  <SelectItem value="Internacional">Internacional</SelectItem>
                  <SelectItem value="Corporativa">Corporativa</SelectItem>
                  <SelectItem value="ONG">ONG</SelectItem>
                </SelectContent>
              </Select>
              {errors.tipo && (
                <p className="text-sm text-destructive">{errors.tipo}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción *</Label>
            <Textarea
              id="descripcion"
              value={formData.descripcion}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  descripcion: e.target.value,
                }))
              }
              placeholder="Describe la alianza y su propósito..."
              rows={3}
              className={errors.descripcion ? "border-destructive" : ""}
            />
            {errors.descripcion && (
              <p className="text-sm text-destructive">{errors.descripcion}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Logo</Label>
            <ImageUpload
              value={formData.logo}
              onChange={handleImageChange}
              maxSize={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="link">Enlace Web (opcional)</Label>
            <Input
              id="link"
              type="url"
              value={formData.link}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, link: e.target.value }))
              }
              placeholder="https://ejemplo.com"
              className={errors.link ? "border-destructive" : ""}
            />
            {errors.link && (
              <p className="text-sm text-destructive">{errors.link}</p>
            )}
          </div>

          {errors.submit && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{errors.submit}</p>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {mode === "edit" ? "Actualizar" : "Crear"} Alianza
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
