import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ShieldCheck, Mail, Smartphone } from "lucide-react"

export function TrustSafetyModule() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Centru de Încredere și Siguranță</CardTitle>
        <CardDescription>Completează-ți profilul pentru a construi încredere în comunitate.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-1">
            <Label>Scorul tău de încredere</Label>
            <span className="font-bold text-green-600">75%</span>
          </div>
          <Progress value={75} className="[&>*]:bg-green-500" />
        </div>
        <div className="space-y-4">
          <Card className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <p>Verificare ID</p>
            </div>
            <Button variant="secondary" size="sm">
              Verificat
            </Button>
          </Card>
          <Card className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Mail className="w-6 h-6 text-green-500" />
              <p>Adresă de e-mail</p>
            </div>
            <Button variant="secondary" size="sm">
              Verificat
            </Button>
          </Card>
          <Card className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Smartphone className="w-6 h-6 text-gray-400" />
              <p>Număr de telefon</p>
            </div>
            <Button size="sm">Verifică acum</Button>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
