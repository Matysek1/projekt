"use client"

import { useState } from "react"
import { Sidebar } from "../componenty/sidebar"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { AlertCircle, CheckCircle, Copy, Globe, Shield, ExternalLink, Info } from "lucide-react"

export default function DNSSettings() {
  const [domain] = useState("muj-web.webyhned.cz")
  const [customDomain, setCustomDomain] = useState("example.com")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("Zkopírováno do schránky!")
      })
      .catch(() => {
        alert("Nepodařilo se zkopírovat do schránky.")
      })
  }

  const dnsRecords = [
    {
      type: "A",
      name: "@",
      value: "185.199.108.153",
      description: "Hlavní doména (example.com)",
    },
    {
      type: "A",
      name: "www",
      value: "185.199.108.153",
      description: "WWW subdoména (www.example.com)",
    },
    {
      type: "CNAME",
      name: "*",
      value: "muj-web.webyhned.cz",
      description: "Všechny ostatní subdomény",
    },
  ]

  const nameservers = ["ns1.webyhned.cz", "ns2.webyhned.cz"]

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:px-6">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">DNS nastavení</h1>
          </div>
          <Button variant="outline" size="sm">
            Nápověda
          </Button>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Current domain info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Vaše Webyhned doména
                </CardTitle>
                <CardDescription>Aktuální doména vašeho webu na Webyhned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Input value={domain} readOnly className="font-mono" />
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(domain)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://${domain}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Toto je vaše výchozí doména na Webyhned. Pokud chcete používat vlastní doménu, postupujte podle
                  instrukcí níže.
                </p>
              </CardContent>
            </Card>

            <Tabs defaultValue="custom-domain">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="custom-domain">Vlastní doména</TabsTrigger>
                <TabsTrigger value="nameservers">Name servery</TabsTrigger>
              </TabsList>

              {/* Custom Domain Setup */}
              <TabsContent value="custom-domain" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Nastavení vlastní domény</CardTitle>
                    <CardDescription>
                      Připojte svou vlastní doménu k vašemu Webyhned webu pomocí DNS záznamů
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="custom-domain">Vaše vlastní doména</Label>
                      <Input
                        id="custom-domain"
                        value={customDomain}
                        onChange={(e) => setCustomDomain(e.target.value)}
                        placeholder="example.com"
                        className="font-mono"
                      />
                      <p className="text-sm text-gray-500 mt-1">Zadejte doménu, kterou chcete připojit k vašemu webu</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-blue-900">Jak připojit vlastní doménu</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Přidejte následující DNS záznamy u vašeho poskytovatele domény (registrátora). Změny se
                            projeví během 24-48 hodin.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>DNS záznamy k přidání</CardTitle>
                    <CardDescription>
                      Zkopírujte tyto záznamy a přidejte je do DNS nastavení u vašeho registrátora
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dnsRecords.map((record, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                            <div>
                              <Label className="text-xs text-gray-500">TYP</Label>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="font-mono">
                                  {record.type}
                                </Badge>
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs text-gray-500">NÁZEV</Label>
                              <div className="flex items-center gap-2">
                                <code className="text-sm bg-gray-100 px-2 py-1 rounded">{record.name}</code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(record.name)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs text-gray-500">HODNOTA</Label>
                              <div className="flex items-center gap-2">
                                <code className="text-sm bg-gray-100 px-2 py-1 rounded">{record.value}</code>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(record.value)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <div>
                              <Label className="text-xs text-gray-500">POPIS</Label>
                              <p className="text-sm text-gray-600">{record.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-yellow-900">Důležité poznámky</h4>
                          <ul className="text-sm text-yellow-800 mt-1 space-y-1">
                            <li>• TTL (Time To Live) nastavte na 3600 sekund (1 hodina)</li>
                            <li>• Pokud máte existující záznamy pro @ a www, nahraďte je</li>
                            <li>• Změny DNS se projeví během 24-48 hodin</li>
                            <li>• Po nastavení nás kontaktujte pro aktivaci SSL certifikátu</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step by step guide */}
                <Card>
                  <CardHeader>
                    <CardTitle>Návod krok za krokem</CardTitle>
                    <CardDescription>Detailní postup pro nejčastější registrátory</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <h4 className="font-medium">1. Přihlaste se k vašemu registrátorovi</h4>
                        <p className="text-sm text-gray-600">
                          Přihlaste se do administrace u poskytovatele, kde máte zaregistrovanou doménu (např. Wedos,
                          Active24, GoDaddy, Cloudflare).
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">2. Najděte DNS nastavení</h4>
                        <p className="text-sm text-gray-600">
                          Hledejte sekci s názvem DNS, DNS záznamy, DNS Management nebo Správa DNS.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">3. Přidejte nebo upravte záznamy</h4>
                        <p className="text-sm text-gray-600">
                          Přidejte výše uvedené DNS záznamy. Pokud již existují záznamy pro @ a www, nahraďte je novými
                          hodnotami.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">4. Uložte změny</h4>
                        <p className="text-sm text-gray-600">
                          Uložte změny a počkejte na propagaci DNS (obvykle 1-24 hodin).
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">5. Ověřte nastavení</h4>
                        <p className="text-sm text-gray-600">
                          Po propagaci zkuste navštívit vaši doménu. Pokud vše funguje, kontaktujte nás pro aktivaci SSL
                          certifikátu.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Name Servers Alternative */}
              <TabsContent value="nameservers" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Alternativa: Webyhned Name Servery</CardTitle>
                    <CardDescription>Místo DNS záznamů můžete změnit name servery na Webyhned servery</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-blue-900">Jednodušší řešení</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Pokud nechcete nastavovat jednotlivé DNS záznamy, můžete změnit name servery na naše. Tím
                            předáte celou správu DNS na Webyhned.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Webyhned Name Servery:</h4>
                      {nameservers.map((ns, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Label className="w-20">NS{index + 1}:</Label>
                          <Input value={ns} readOnly className="font-mono flex-1" />
                          <Button variant="outline" size="sm" onClick={() => copyToClipboard(ns)}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 mt-6">
                      <h4 className="font-medium">Postup změny name serverů:</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                        <li>Přihlaste se k vašemu registrátorovi domény</li>
                        <li>Najděte sekci Name Servery nebo DNS Servery</li>
                        <li>Nahraďte stávající name servery výše uvedenými</li>
                        <li>Uložte změny</li>
                        <li>Propagace trvá obvykle 24-48 hodin</li>
                      </ol>
                    </div>

                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-yellow-900">Upozornění</h4>
                          <p className="text-sm text-yellow-800 mt-1">
                            Změnou name serverů ztratíte kontrolu nad všemi DNS záznamy domény. Pokud používáte email
                            nebo jiné služby na této doméně, kontaktujte nás před změnou.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  SSL certifikát
                </CardTitle>
                <CardDescription>Automatické HTTPS zabezpečení</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-900">Automatický SSL certifikát</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Po správném nastavení DNS automaticky vygenerujeme a nainstalujeme SSL certifikát pro vaši
                        doménu. Váš web bude dostupný přes zabezpečené HTTPS připojení.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact info */}
            <Card>
              <CardHeader>
                <CardTitle>Potřebujete pomoc?</CardTitle>
                <CardDescription>Kontaktujte nás, pokud máte problémy s nastavením</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong>Email:</strong> podpora@webyhned.cz
                  </p>
                  <p className="text-sm">
                    <strong>Telefon:</strong> +420 123 456 789
                  </p>
                  <p className="text-sm text-gray-600">
                    Rádi vám pomůžeme s nastavením DNS nebo odpovíme na vaše dotazy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
