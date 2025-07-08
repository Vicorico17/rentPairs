"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Home, User } from "lucide-react"

type UserType = "tenant" | "host"

export function AuthPage({
  initialUserType,
  onAuthSuccess,
}: {
  initialUserType: UserType | null
  onAuthSuccess: () => void
}) {
  const [userType, setUserType] = React.useState<UserType>(initialUserType || "tenant")

  React.useEffect(() => {
    if (initialUserType) {
      setUserType(initialUserType)
    }
  }, [initialUserType])

  return (
    <div className="flex items-center justify-center">
      <Tabs defaultValue="signup" className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Bun venit la RentPair</CardTitle>
          <CardDescription>Găsește-ți chiria sau chiriașul perfect.</CardDescription>
        </CardHeader>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Autentificare</TabsTrigger>
          <TabsTrigger value="signup">Înregistrare</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input id="email-login" type="email" placeholder="m@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-login">Parolă</Label>
                <Input id="password-login" type="password" />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={onAuthSuccess}>
                Autentificare
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className={cn(
                    "flex flex-col h-24 justify-center items-center gap-2",
                    userType === "tenant" && "border-blue-600 border-2",
                  )}
                  onClick={() => setUserType("tenant")}
                >
                  <User className="w-8 h-8" />
                  <span>Sunt Chiriaș</span>
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "flex flex-col h-24 justify-center items-center gap-2",
                    userType === "host" && "border-blue-600 border-2",
                  )}
                  onClick={() => setUserType("host")}
                >
                  <Home className="w-8 h-8" />
                  <span>Sunt Proprietar</span>
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" type="email" placeholder="m@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Parolă</Label>
                <Input id="password-signup" type="password" />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={onAuthSuccess}>
                Creează Cont
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-100 dark:bg-gray-900 px-2 text-muted-foreground">Sau continuă cu</span>
          </div>
        </div>
        <Button variant="outline" className="w-full bg-transparent">
          Google
        </Button>
      </Tabs>
    </div>
  )
}
