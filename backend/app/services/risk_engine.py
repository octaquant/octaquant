from dataclasses import dataclass

from app.models import MarketType


@dataclass(frozen=True)
class ContractSpec:
    contract_currency: str
    contract_multiplier: float
    min_lot: float


CONTRACT_SPECS = {
    MarketType.INDIAN: ContractSpec(contract_currency='INR', contract_multiplier=50, min_lot=1),
    MarketType.CRYPTO: ContractSpec(contract_currency='USD', contract_multiplier=1, min_lot=0.001),
    MarketType.FOREX: ContractSpec(contract_currency='USD', contract_multiplier=100000, min_lot=0.01),
}


class UniversalRiskEngine:
    def calculate_lot_size(self, equity: float, risk_pct: float, stop_distance: float, market: MarketType) -> dict:
        spec = CONTRACT_SPECS[market]
        risk_capital = equity * risk_pct
        raw_lots = risk_capital / max(stop_distance * spec.contract_multiplier, 1e-9)
        adjusted_lots = max(round(raw_lots / spec.min_lot) * spec.min_lot, spec.min_lot)
        return {
            'market': market.value,
            'currency': spec.contract_currency,
            'lot_size': adjusted_lots,
            'risk_capital': round(risk_capital, 2),
        }

    @staticmethod
    def calculate_risk_of_ruin(win_rate: float, reward_risk_ratio: float, risk_pct: float) -> float:
        edge = (win_rate * reward_risk_ratio) - (1 - win_rate)
        if edge <= 0:
            return 1.0

        stress_factor = min(max(risk_pct * 20, 0.01), 0.95)
        ruin = max(0.0, min(1.0, (1 - edge) * stress_factor))
        return round(ruin, 4)
