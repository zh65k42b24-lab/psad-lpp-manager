'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === 'demo@psad-france.fr' && password === 'Demo2024!') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('psad_user', JSON.stringify({
          email,
          name: 'Utilisateur Démo',
          role: 'user',
          loggedAt: new Date().toISOString(),
        }));
      }
      router.push('/');
    } else {
      setError('Email ou mot de passe incorrect. Utilisez les identifiants de démo ci-dessous.');
    }
    setIsLoading(false);
  };

  const fillDemoCredentials = () => {
    setEmail('demo@psad-france.fr');
    setPassword('Demo2024!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-psad-blue-600 to-psad-blue-700 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">
            📋
          </div>
          <h1 className="text-3xl font-bold text-psad-blue-700">PSAD LPP Manager</h1>
          <p className="text-gray-600 mt-2">Connexion à votre espace professionnel</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Connexion</CardTitle>
            <CardDescription>Accédez à votre tableau de bord LPP</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email professionnel
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@psad-france.fr"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <Button type="submit" variant="psad" size="lg" className="w-full" isLoading={isLoading}>
                Se connecter
              </Button>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-2">🎯 Mode Démo</p>
                <p className="text-xs text-blue-800 mb-2">
                  Email : <code className="bg-white px-1 rounded">demo@psad-france.fr</code>
                </p>
                <p className="text-xs text-blue-800 mb-3">
                  Mot de passe : <code className="bg-white px-1 rounded">Demo2024!</code>
                </p>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-xs text-psad-blue-600 hover:underline font-medium"
                >
                  → Remplir automatiquement
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm">
              <a href="/" className="text-psad-blue-600 hover:underline">
                ← Retour à l'accueil
              </a>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-6">
          © 2024 PSAD France · Conforme RGPD · Données chiffrées
        </p>
      </div>
    </div>
  );
}
