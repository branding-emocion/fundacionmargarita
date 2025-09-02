"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Trash2, Edit, Plus, Upload } from "lucide-react";
import { useBanners } from "@/hooks/useBanners";

export default function BannerAdmin() {
  const [editingBanner, setEditingBanner] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    isActive: true,
  });
  const { banners, isLoading, saveBanner, deleteBanner, isUsingFirebase } =
    useBanners();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBanner) {
      saveBanner({ ...formData, id: editingBanner.id });
      setEditingBanner(null);
    } else {
      saveBanner({ ...formData, id: Date.now().toString() });
      setIsCreating(false);
    }
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      linkUrl: "",
      isActive: true,
    });
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData(banner);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingBanner(null);
    setIsCreating(false);
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      linkUrl: "",
      isActive: true,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // En producción, aquí subirías la imagen a un servicio como Vercel Blob
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, imageUrl });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-cyan-600">
          Administrar Banners
        </h1>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-pink-500 hover:bg-pink-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Banner
        </Button>
      </div>

      {(isCreating || editingBanner) && (
        <Card className="border-2 border-cyan-200">
          <CardHeader>
            <CardTitle className="text-cyan-600">
              {editingBanner ? "Editar Banner" : "Crear Nuevo Banner"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título (opcional)</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Título del banner"
                  className="border-cyan-200 focus:border-cyan-400"
                />
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Descripción del banner"
                  className="border-cyan-200 focus:border-cyan-400"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="image">Imagen</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("image-upload").click()
                    }
                    className="border-cyan-200 text-cyan-600 hover:bg-cyan-50"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Imagen
                  </Button>
                  {formData.imageUrl && (
                    <img
                      src={formData.imageUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-lg border-2 border-cyan-200"
                    />
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="link">Enlace (opcional)</Label>
                <Input
                  id="link"
                  value={formData.linkUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, linkUrl: e.target.value })
                  }
                  placeholder="/ruta-del-enlace"
                  className="border-cyan-200 focus:border-cyan-400"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isActive: checked })
                  }
                />
                <Label htmlFor="active">Banner activo</Label>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  {editingBanner ? "Actualizar" : "Crear"} Banner
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-gray-300 bg-transparent"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {banners.map((banner) => (
          <Card key={banner.id} className="border-l-4 border-l-cyan-400">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-cyan-700">
                      {banner.title || "Sin título"}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        banner.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {banner.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">
                    {banner.description}
                  </p>
                  {banner.linkUrl && (
                    <p className="text-cyan-600 text-sm">
                      Enlace: {banner.linkUrl}
                    </p>
                  )}
                </div>
                {banner.imageUrl && (
                  <img
                    src={banner.imageUrl || "/placeholder.svg"}
                    alt={banner.title}
                    className="w-20 h-20 object-cover rounded-lg border-2 border-cyan-200 ml-4"
                  />
                )}
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(banner)}
                    className="text-cyan-600 border-cyan-200 hover:bg-cyan-50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteBanner(banner.id)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
