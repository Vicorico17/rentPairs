"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PropertiesModal } from "@/components/properties-modal"
import { Users, Home, Building, Twitter, Instagram, Facebook, ShieldCheck, Lock, EyeOff, Search, MapPin } from "lucide-react"
import * as React from "react"

const AppLogo = () => (
  <div className="flex flex-col leading-tight font-bold">
    <span className="text-2xl text-blue-600">Rent</span>
    <span className="text-2xl text-gray-800 dark:text-white">Pairs</span>
  </div>
)

export function LandingPage({ onChoice }: { onChoice: (type: "tenant" | "host" | null) => void }) {
  const [showPropertiesModal, setShowPropertiesModal] = React.useState(false)

  return (
    <div className="w-full bg-beige-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-sans">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto flex items-center justify-between p-4">
          <AppLogo />
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => onChoice("tenant")}>
              Autentificare
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-lg" onClick={() => onChoice("tenant")}>
              Înregistrare
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-end text-center bg-gray-100 dark:bg-gray-900 min-h-[60vh]">
        <div
          className="absolute inset-0 bg-cover bg-[center_top] opacity-60"
          style={{
            backgroundImage:
              "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GettyImages-1461608444.jpg-zCzRyG0ZwC6sNE5I9cY3F3dmXy59VU.jpeg')",
          }}
        />
        <div className="container mx-auto relative px-4 pb-16 md:pb-20">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
            Setează-ți standarde mai înalte.
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-200">
            Meriți mai mult. Am creat o metodă mai bună pentru a găsi colegi și locuințe, cu mai puțin stres.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 rounded-lg"
              onClick={() => onChoice("tenant")}
            >
              Sunt chiriaș
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg px-8 py-6 rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              onClick={() => onChoice("host")}
            >
              Am o locuință
            </Button>
          </div>
        </div>
      </section>

      {/* Not Just for Renting Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Nu suntem doar pentru închirieri</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-left">
            <Card className="p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <Users className="w-10 h-10 text-blue-600" />
                <h3 className="text-xl font-semibold">Găsește un coleg de apartament</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Găsește pe cineva cu care chiar vrei să locuiești. Conectează-te pe baza stilului de viață, curățenie și
                obiceiuri comune.
              </p>
            </Card>
            <Card className="p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <Building className="w-10 h-10 text-blue-600" />
                <h3 className="text-xl font-semibold">Găsește o cameră</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Găsește o cameră într-un apartament care se potrivește personalității tale. Verifică gazdele și viitorii
                colegi înainte de a te muta.
              </p>
            </Card>
            <Card className="p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <Home className="w-10 h-10 text-blue-600" />
                <h3 className="text-xl font-semibold">Găsește chiriașul perfect</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Publică-ți spațiul și primește potriviri cu chiriași verificați, care îți respectă regulile și stilul de
                viață.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Ce spun utilizatorii noștri</h2>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card className="p-6 rounded-xl">
              <CardContent>
                <p className="mt-4 italic text-lg">
                  "Am găsit coleg de apartament în 2 zile. Incredibil de simplu față de grupurile de Facebook."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Andreea D.</p>
                    <p className="text-sm text-gray-500">Studentă la ASE, București</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="p-6 rounded-xl">
              <CardContent>
                <p className="mt-4 italic text-lg">
                  "Mi-am închiriat garsoniera din Militari fără bătăi de cap. Am primit doar cereri de la oameni
                  serioși."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>D</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Dan P.</p>
                    <p className="text-sm text-gray-500">Proprietar, București</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partner Properties Section - NEW */}
      <section className="py-20 bg-blue-50 dark:bg-blue-950/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Building className="w-16 h-16 mx-auto text-blue-600 mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Proprietăți de la Partenerii Noștri
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Descoperă sute de proprietăți verificate de la partenerii noștri de încredere. 
              Găsește-ți locuința perfectă în orașe din toată România.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">200+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Proprietăți disponibile</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Orașe acoperite</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Verificate</div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setShowPropertiesModal(true)}
            >
              <Search className="w-5 h-5 mr-3" />
              Vezi Proprietăți
            </Button>
            
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Contactează direct proprietarii și programează vizionări
            </p>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Siguranța ta, prioritatea noastră</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Construim o comunitate de încredere prin instrumente care te protejează.
          </p>
          <div className="mt-12 grid sm:grid-cols-3 gap-8">
            <div className="p-6">
              <ShieldCheck className="w-10 h-10 mx-auto text-green-600" />
              <h3 className="mt-4 text-lg font-semibold">Verificare ID</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Confirmă identitatea potențialilor colegi.</p>
            </div>
            <div className="p-6">
              <Lock className="w-10 h-10 mx-auto text-green-600" />
              <h3 className="mt-4 text-lg font-semibold">Mesagerie securizată</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Conversațiile tale sunt private și protejate.</p>
            </div>
            <div className="p-6">
              <EyeOff className="w-10 h-10 mx-auto text-green-600" />
              <h3 className="mt-4 text-lg font-semibold">Confidențialitate</h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">Tu controlezi ce informații partajezi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Gata să-ți găsești perechea?</h2>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-lg"
              onClick={() => onChoice("tenant")}
            >
              Vreau să închiriez
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-lg bg-transparent"
              onClick={() => onChoice("host")}
            >
              Vreau să ofer în chirie
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <AppLogo />
              <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-sm">
                Modul inteligent de a găsi colegi de apartament.
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Companie</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Despre noi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Întrebări frecvente
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Legal</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Confidențialitate
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Termeni și Condiții
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">&copy; 2025 RentPairs. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-600">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Properties Modal */}
      <PropertiesModal 
        open={showPropertiesModal} 
        onOpenChange={setShowPropertiesModal} 
      />
    </div>
  )
}
