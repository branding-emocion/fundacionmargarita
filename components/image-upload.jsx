"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, ImageIcon } from "lucide-react";

export function ImageUpload({ value, onChange, maxSize = 5 }) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    if (!file.type.startsWith("image/")) {
      return "Solo se permiten archivos de imagen";
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `El archivo debe ser menor a ${maxSize}MB`;
    }

    return null;
  };

  const compressImage = (file, maxWidth = 800, quality = 0.8) => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(resolve, "image/jpeg", quality);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const processFile = async (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    try {
      const compressedFile = await compressImage(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        onChange(e.target.result, compressedFile);
      };

      reader.readAsDataURL(compressedFile);
    } catch (err) {
      setError("Error al procesar la imagen");
    }
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
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {value ? (
        <Card className="relative">
          <CardContent className="p-4">
            <div className="relative">
              <img
                src={value || "/placeholder.svg"}
                alt="Logo preview"
                className="w-full h-32 object-contain rounded-lg bg-muted"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemove}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={`border-2 border-dashed transition-colors cursor-pointer ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <ImageIcon className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">
                  Arrastra una imagen aquí o haz clic para seleccionar
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, JPEG hasta {maxSize}MB
                </p>
              </div>
              <Button type="button" variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Seleccionar archivo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
