import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

export default function CurrencyConverter() {
  const [country, setCountry] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);

  const conversionRates = {
    USA: 1.1,
    UK: 0.85,
    JP: 130.5,
    CA: 1.45,
    AU: 1.6,
    CH: 0.98,
    IN: 90.3,
    BR: 5.2,
    MX: 18.9,
    ZA: 17.5
  };

  const handleConvert = () => {
    if (!country || !amount) return;
    
    const conversionRate = conversionRates[country] || 1;
    const fixedFee = 2.5;
    const percentageFee = 0.02 * parseFloat(amount);
    const totalFees = (fixedFee + percentageFee).toFixed(2);
    const convertedAmount = (parseFloat(amount) * conversionRate - totalFees).toFixed(2);
    
    setResult({
      converted: convertedAmount,
      details: {
        rate: conversionRate,
        fixedFee: fixedFee,
        percentageFee: percentageFee.toFixed(2),
        totalFees: totalFees
      }
    });
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center gap-4 p-6">
        <h1 className="text-2xl font-bold">Simulation de frais bancaires</h1>
        <Card className="p-4 w-full max-w-md">
          <CardContent className="flex flex-col gap-4">
            <Select onValueChange={setCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un pays" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(conversionRates).map((code) => (
                  <SelectItem key={code} value={code}>{code}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Montant en €"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Button onClick={handleConvert}>Calculer</Button>
          </CardContent>
        </Card>
        
        {result && (
          <Card className="p-4 w-full max-w-md mt-4">
            <CardContent>
              <p className="text-lg font-semibold">Montant après conversion : {result.converted} {country}</p>
              <div className="text-sm text-gray-500 space-y-2">
                <p>
                  Taux de conversion appliqué : {result.details.rate}
                  <Tooltip>
                    <TooltipTrigger className="ml-2 text-blue-500 cursor-pointer">ℹ️</TooltipTrigger>
                    <TooltipContent>Valeur actuelle du taux de change pour le pays sélectionné.</TooltipContent>
                  </Tooltip>
                </p>
                <p>
                  Frais fixes : {result.details.fixedFee}€
                  <Tooltip>
                    <TooltipTrigger className="ml-2 text-blue-500 cursor-pointer">ℹ️</TooltipTrigger>
                    <TooltipContent>Frais de transaction bancaires fixes appliqués.</TooltipContent>
                  </Tooltip>
                </p>
                <p>
                  Frais en pourcentage : {result.details.percentageFee}€
                  <Tooltip>
                    <TooltipTrigger className="ml-2 text-blue-500 cursor-pointer">ℹ️</TooltipTrigger>
                    <TooltipContent>Pourcentage des frais basés sur le montant converti.</TooltipContent>
                  </Tooltip>
                </p>
                <p>
                  Total des frais : {result.details.totalFees}€
                  <Tooltip>
                    <TooltipTrigger className="ml-2 text-blue-500 cursor-pointer">ℹ️</TooltipTrigger>
                    <TooltipContent>Somme des frais fixes et en pourcentage.</TooltipContent>
                  </Tooltip>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
}
