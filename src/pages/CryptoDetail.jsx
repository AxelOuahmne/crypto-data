import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown, ArrowLeft } from 'lucide-react';
import { cryptoList, cryptoData } from '@/data/cryptoData';

const CryptoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const crypto = cryptoList.find(c => c.id === id);
  const data = cryptoData[id];

  if (!crypto || !data) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Crypto non trouvée</h1>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au dashboard
        </button>
      </div>
    );
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const chartData = data.price_history.day.map((price, index) => ({
    date: index.toString(),
    price: price
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour
        </button>
        <div className="flex items-center gap-4">
          <img src={crypto.image} alt={crypto.name} className="w-12 h-12" />
          <div>
            <h1 className="text-3xl font-bold">{crypto.name}</h1>
            <p className="text-gray-400">{crypto.symbol.toUpperCase()}</p>
          </div>
          <div className="ml-auto">
            <div className="text-2xl font-bold">
              {formatCurrency(data.current_price)}
            </div>
            <div 
              className={`flex items-center gap-1 ${
                data.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {data.price_change_percentage_24h >= 0 ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              {data.price_change_percentage_24h.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chart */}
        <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Historique des prix (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" tickFormatter={formatCurrency} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                    itemStyle={{ color: '#E5E7EB' }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#3B82F6"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Statistiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Volume 24h</div>
                  <div className="text-lg font-semibold">
                    {formatCurrency(data.total_volume)}
                  </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-400">Cap. Marché</div>
                  <div className="text-lg font-semibold">
                    {formatCurrency(data.market_cap)}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-lg font-semibold mb-3">Performance</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">1h</span>
                    <span className="text-green-400">+1.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">24h</span>
                    <span className={data.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {data.price_change_percentage_24h >= 0 ? '+' : ''}
                      {data.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">7d</span>
                    <span className="text-red-400">-2.5%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoDetail;