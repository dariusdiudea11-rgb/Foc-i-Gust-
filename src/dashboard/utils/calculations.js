export function totalVenituri(targ) {
  const v = targ.venituri
  return (v.mici + v.ceafa + v.carnaciori + v.cartofi + v.bauturi + v.alte) || 0
}

export function totalCosturi(targ) {
  const c = targ.costuri
  return (c.carne + c.carbuni + c.transport + c.taxeStand + c.personal + c.alte) || 0
}

export function profit(targ) {
  return totalVenituri(targ) - totalCosturi(targ)
}

export function marjaProfit(targ) {
  const venit = totalVenituri(targ)
  if (venit === 0) return 0
  return (profit(targ) / venit) * 100
}

export function totaleSezon(targuri) {
  return targuri.reduce(
    (acc, t) => ({
      venituri: acc.venituri + totalVenituri(t),
      costuri:  acc.costuri  + totalCosturi(t),
      profit:   acc.profit   + profit(t),
    }),
    { venituri: 0, costuri: 0, profit: 0 }
  )
}

export function topTarguri(targuri, n = 3) {
  return [...targuri]
    .filter(t => t.status === 'finalizat')
    .sort((a, b) => profit(b) - profit(a))
    .slice(0, n)
}

export function emptyFinanciar() {
  return {
    venituri: { mici: 0, ceafa: 0, carnaciori: 0, cartofi: 0, bauturi: 0, alte: 0 },
    costuri:  { carne: 0, carbuni: 0, transport: 0, taxeStand: 0, personal: 0, alte: 0 },
  }
}
