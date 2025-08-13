import React, { useState, useEffect } from 'react';

const UsuarioForm = ({ onSubmit, initialData, onCancel, isEditing, loading }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    rol: 'cliente'
  });

  const [errors, setErrors] = useState({});

  // Actualizar formulario cuando cambian los datos iniciales
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        correo: initialData.correo || '',
        contrasena: '', // Por seguridad, no mostramos la contraseña
        rol: initialData.rol || 'cliente'
      });
    } else {
      setFormData({
        nombre: '',
        correo: '',
        contrasena: '',
        rol: 'cliente'
      });
    }
    setErrors({});
  }, [initialData]);

  // Validaciones
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'El formato del correo no es válido';
    }

    if (!isEditing && !formData.contrasena) {
      newErrors.contrasena = 'La contraseña es requerida';
    } else if (formData.contrasena && formData.contrasena.length < 6) {
      newErrors.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Si estamos editando y no se cambió la contraseña, no la enviamos
      const dataToSubmit = { ...formData };
      if (isEditing && !formData.contrasena) {
        delete dataToSubmit.contrasena;
      }
      
      onSubmit(dataToSubmit);
      
      // Limpiar formulario solo si estamos creando (no editando)
      if (!isEditing) {
        setFormData({
          nombre: '',
          correo: '',
          contrasena: '',
          rol: 'cliente'
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="usuario-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="nombre">👤 Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? 'error' : ''}
            placeholder="Ingresa el nombre completo"
            disabled={loading}
          />
          {errors.nombre && <span className="error-message">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="correo">📧 Correo Electrónico *</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className={errors.correo ? 'error' : ''}
            placeholder="ejemplo@correo.com"
            disabled={loading}
          />
          {errors.correo && <span className="error-message">{errors.correo}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="contrasena">
            🔒 Contraseña {isEditing ? '(opcional)' : '*'}
          </label>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            className={errors.contrasena ? 'error' : ''}
            placeholder={isEditing ? "Dejar vacío para no cambiar" : "Mínimo 6 caracteres"}
            disabled={loading}
          />
          {errors.contrasena && <span className="error-message">{errors.contrasena}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="rol">🎭 Rol</label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="cliente">Cliente</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? '⏳ Procesando...' : (isEditing ? '✏️ Actualizar' : '➕ Crear Usuario')}
        </button>
        
        {isEditing && (
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            ❌ Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default UsuarioForm;