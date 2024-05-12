export class DashboardData {
  total_farms: number;
  total_in_hectares: number;
  usage_solo_percent: number;
  total_per_states: Object;
  total_per_crops: Object;

  constructor(
    total_farms: number,
    total_in_hectares: number,
    usage_solo_percent: number,
    total_per_states: Object,
    total_per_crops: Object,
  ) {
    this.total_farms = total_farms;
    this.total_in_hectares = total_in_hectares;
    this.usage_solo_percent = usage_solo_percent;
    this.total_per_states = total_per_states;
    this.total_per_crops = total_per_crops;
  }
}
