import React, { useState } from 'react';
import AuthStatus from '../../components/AuthStatus';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Datos de ejemplo para el dashboard
  const stats = {
    totalUsers: 156,
    activeUsers: 23,
    totalProducts: 89,
    lowStock: 12,
    totalOrders: 234,
    pendingOrders: 8,
    revenue: 45280,
    monthlyGrowth: 12.5
  };

  const recentOrders = [
    { id: '#001', customer: 'Ana García', total: 1250, status: 'Completado', date: '2025-01-15' },
    { id: '#002', customer: 'Carlos López', total: 890, status: 'Pendiente', date: '2025-01-15' },
    { id: '#003', customer: 'María Rodríguez', total: 2100, status: 'Enviado', date: '2025-01-14' },
    { id: '#004', customer: 'José Hernández', total: 750, status: 'Procesando', date: '2025-01-14' },
  ];

  const lowStockProducts = [
    { id: 1, name: 'Maceta Decorativa Grande', stock: 3, minStock: 10 },
    { id: 2, name: 'Fertilizante Orgánico', stock: 1, minStock: 5 },
    { id: 3, name: 'Semillas de Girasol', stock: 2, minStock: 8 },
    { id: 4, name: 'Regadera Profesional', stock: 4, minStock: 10 },
  ];

  const menuItems = [
    { id: 'overview', label: 'Resumen General', icon: '📊' },
    { id: 'users', label: 'Gestión de Usuarios', icon: '👥' },
    { id: 'products', label: 'Gestión de Productos', icon: '🌿' },
    { id: 'orders', label: 'Pedidos y Ventas', icon: '🛒' },
    { id: 'inventory', label: 'Inventario', icon: '📦' },
    { id: 'analytics', label: 'Analíticas', icon: '📈' },
    { id: 'settings', label: 'Configuración', icon: '⚙️' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Usuarios Totales</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">{stats.activeUsers} activos</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Productos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <span className="text-green-600 text-xl">🌿</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-red-600 text-sm font-medium">{stats.lowStock} stock bajo</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pedidos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <span className="text-orange-600 text-xl">🛒</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-orange-600 text-sm font-medium">{stats.pendingOrders} pendientes</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos</p>
              <p className="text-2xl font-bold text-gray-900">${stats.revenue.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <span className="text-purple-600 text-xl">💰</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">+{stats.monthlyGrowth}% este mes</span>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pedidos Recientes</h3>
            <button className="text-[#6FAD46] hover:text-[#5a9639] text-sm font-medium">
              Ver todos
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">{order.id}</span>
                    <span className="text-sm text-gray-600">{order.customer}</span>
                  </div>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${order.total}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Completado' ? 'bg-green-100 text-green-800' :
                    order.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Alerta de Stock Bajo</h3>
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
              {lowStockProducts.length} productos
            </span>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-600">Stock mínimo: {product.minStock}</p>
                </div>
                <div className="text-right">
                  <span className="text-red-600 font-bold text-sm">{product.stock} restantes</span>
                  <button className="block text-xs text-red-600 hover:text-red-800 mt-1">
                    Reponer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
        <button className="bg-[#6FAD46] hover:bg-[#5a9639] text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Nuevo Usuario
        </button>
      </div>

      {/* Users Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center space-x-2">
            <span className="text-blue-600">👤</span>
            <div>
              <p className="text-sm text-blue-600 font-medium">Administradores</p>
              <p className="text-xl font-bold text-blue-800">3</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center space-x-2">
            <span className="text-green-600">👥</span>
            <div>
              <p className="text-sm text-green-600 font-medium">Clientes</p>
              <p className="text-xl font-bold text-green-800">142</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-600">🟢</span>
            <div>
              <p className="text-sm text-yellow-600 font-medium">En Línea</p>
              <p className="text-xl font-bold text-yellow-800">23</p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-center space-x-2">
            <span className="text-red-600">🔒</span>
            <div>
              <p className="text-sm text-red-600 font-medium">Bloqueados</p>
              <p className="text-xl font-bold text-red-800">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Lista de Usuarios</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Buscar usuarios..."
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Todos los roles</option>
                <option>Administradores</option>
                <option>Clientes</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último acceso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: 'Ana García', email: 'ana@email.com', role: 'Cliente', status: 'Activo', lastLogin: '2025-01-15 10:30' },
                { name: 'Carlos López', email: 'carlos@email.com', role: 'Cliente', status: 'En línea', lastLogin: '2025-01-15 14:20' },
                { name: 'María Admin', email: 'maria@xicalango.com', role: 'Admin', status: 'Activo', lastLogin: '2025-01-15 09:15' },
                { name: 'José Hernández', email: 'jose@email.com', role: 'Cliente', status: 'Bloqueado', lastLogin: '2025-01-10 16:45' },
              ].map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-[#6FAD46] rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{user.name.charAt(0)}</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'En línea' ? 'bg-green-100 text-green-800' :
                      user.status === 'Activo' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Editar</button>
                      <button className="text-orange-600 hover:text-orange-800 text-sm">Reset Pass</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        {user.status === 'Bloqueado' ? 'Desbloquear' : 'Bloquear'}
                      </button>
                      {user.status === 'En línea' && (
                        <button className="text-purple-600 hover:text-purple-800 text-sm">Desconectar</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">Mostrando 1-4 de 156 usuarios</p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">Anterior</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">Siguiente</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Gestión de Productos</h2>
        <div className="flex space-x-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Importar CSV
          </button>
          <button className="bg-[#6FAD46] hover:bg-[#5a9639] text-white px-4 py-2 rounded-lg font-medium transition-colors">
            + Nuevo Producto
          </button>
        </div>
      </div>

      {/* Product Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-800">89</p>
            <p className="text-sm text-green-600">Total Productos</p>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-800">67</p>
            <p className="text-sm text-blue-600">En Stock</p>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-800">12</p>
            <p className="text-sm text-yellow-600">Stock Bajo</p>
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-800">5</p>
            <p className="text-sm text-red-600">Agotados</p>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-800">5</p>
            <p className="text-sm text-purple-600">Inactivos</p>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Inventario de Productos</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              />
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Todas las categorías</option>
                <option>Plantas</option>
                <option>Herramientas</option>
                <option>Fertilizantes</option>
                <option>Macetas</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Todos los estados</option>
                <option>En stock</option>
                <option>Stock bajo</option>
                <option>Agotado</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: 'Maceta Decorativa Grande', sku: 'MAC001', category: 'Macetas', price: 250, stock: 15, status: 'Activo', image: '🏺' },
                { name: 'Fertilizante Orgánico 5kg', sku: 'FER002', category: 'Fertilizantes', price: 180, stock: 3, status: 'Stock Bajo', image: '🌱' },
                { name: 'Planta Monstera Deliciosa', sku: 'PLA003', category: 'Plantas', price: 450, stock: 8, status: 'Activo', image: '🌿' },
                { name: 'Regadera Profesional 10L', sku: 'HER004', category: 'Herramientas', price: 320, stock: 0, status: 'Agotado', image: '🚿' },
                { name: 'Semillas de Girasol Pack', sku: 'SEM005', category: 'Semillas', price: 45, stock: 25, status: 'Activo', image: '🌻' },
              ].map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-2xl">{product.image}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{product.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      product.stock === 0 ? 'text-red-600' :
                      product.stock <= 5 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {product.stock} unidades
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.status === 'Activo' ? 'bg-green-100 text-green-800' :
                      product.status === 'Stock Bajo' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Ver</button>
                      <button className="text-green-600 hover:text-green-800 text-sm">Editar</button>
                      <button className="text-orange-600 hover:text-orange-800 text-sm">Stock</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">Mostrando 1-5 de 89 productos</p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">Anterior</button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">Siguiente</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'users':
        return renderUsers();
      case 'products':
        return renderProducts();
      case 'orders':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <span className="text-4xl">🛒</span>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">Gestión de Pedidos</h3>
            <p className="text-gray-600 mt-2">Próximamente: Lista de pedidos, estados de envío, facturas</p>
          </div>
        );
      case 'inventory':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <span className="text-4xl">📦</span>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">Control de Inventario</h3>
            <p className="text-gray-600 mt-2">Próximamente: Movimientos de stock, alertas automáticas, reportes</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <span className="text-4xl">📈</span>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">Analíticas y Reportes</h3>
            <p className="text-gray-600 mt-2">Próximamente: Gráficos de ventas, productos más vendidos, métricas</p>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <span className="text-4xl">⚙️</span>
            <h3 className="text-xl font-semibold text-gray-900 mt-4">Configuración del Sistema</h3>
            <p className="text-gray-600 mt-2">Próximamente: Configuración general, notificaciones, respaldos</p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#6FAD46] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">X</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Xicalango Admin</h1>
                  <p className="text-sm text-gray-600">Panel de Administración</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM9 7h6m0 10v-3M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3M9 7H6a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V8a1 1 0 00-1-1z" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <AuthStatus />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            <div className="flex-1 p-6">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-[#6FAD46] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Sidebar Footer */}
            <div className="p-6 border-t border-gray-200">
              <div className="bg-[#6FAD46] bg-opacity-10 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-[#6FAD46] text-lg">🌿</span>
                  <div>
                    <p className="text-sm font-medium text-[#6FAD46]">Xicalango v2.0</p>
                    <p className="text-xs text-gray-600">Sistema de Gestión</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;
