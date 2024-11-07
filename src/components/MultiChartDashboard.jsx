import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUp, ArrowDown, Activity } from 'lucide-react';
import { cryptoList, cryptoData } from '@/data/cryptoData';

const MultiChartDashboard = () => {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [timeframe, setTimeframe] = useState('day');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const currentCrypto = cryptoList.find(crypto => crypto.id === selectedCrypto);
  const currentData = cryptoData[selectedCrypto];

  // Convertir les données d'historique en format pour le graphique
  const formatChartData = (timeframe) => {
    const priceHistory = currentData.price_history[timeframe];
    return priceHistory.map((price, index) => ({
      date: index.toString(), // Utilisez l'index comme date pour l'exemple
      price: price
    }));
  };

  const chartData = formatChartData(timeframe);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {/* Header avec sélecteurs */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Trading View</h1>
          <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
              <SelectValue placeholder="Choisir une crypto" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {cryptoList.map((crypto) => (
                <SelectItem key={crypto.id} value={crypto.id}>
                  <div className="flex items-center gap-2">
                    <img src={crypto.image} alt={crypto.name} className="w-5 h-5" />
                    {crypto.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {['minute', 'hour', 'day', 'week', 'month'].map((tf) => (
                <SelectItem key={tf} value={tf}>
                  {tf.charAt(0).toUpperCase() + tf.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <span className={currentData.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}>
            {formatCurrency(currentData.current_price)}
            <span className="ml-2">
              {currentData.price_change_percentage_24h.toFixed(2)}%
            </span>
          </span>
        </div>
      </div>

      {/* Grid de graphiques */}
      <div className="grid grid-cols-12 gap-4">
        {/* Grand graphique principal */}
        <Card className="col-span-8 bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="h-96">
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

        {/* Panneau latéral avec statistiques et petits graphiques */}
        <div className="col-span-4 space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.slice(-20)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                      itemStyle={{ color: '#E5E7EB' }}
                    />
                    <Bar dataKey="price" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-700 p-2 rounded-lg">
                    <div className="text-sm text-gray-400">1H</div>
                    <div className={currentData.price_change_percentage_24h >= 0 ? "text-green-400" : "text-red-400"}>
                      {currentData.price_change_percentage_24h.toFixed(2)}%
                    </div>
                  </div>
                  <div className="bg-gray-700 p-2 rounded-lg">
                    <div className="text-sm text-gray-400">24H</div>
                    <div className="text-green-400">+2.5%</div>
                  </div>
                  <div className="bg-gray-700 p-2 rounded-lg">
                    <div className="text-sm text-gray-400">7D</div>
                    <div className="text-red-400">-1.2%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent>
              <div className="space-y-4 p-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Volume 24h</span>
                  <span>{formatCurrency(currentData.total_volume)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cap. Marché</span>
                  <span>{formatCurrency(currentData.market_cap)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphique supplémentaire en bas */}
        <Card className="col-span-12 bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                    itemStyle={{ color: '#E5E7EB' }}
                  />
                  <Line type="monotone" dataKey="price" stroke="#10B981" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MultiChartDashboard;