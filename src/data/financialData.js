// Sample financial data for Insurance Financial Analytics Dashboard

// Net adjustment factors for Gross/Net toggle
// Net = Gross after reinsurance cession (18% of premiums ceded, 15% of claims recovered)
const NET_PREMIUM_FACTOR = 0.82;
const NET_CLAIMS_FACTOR = 0.85;

// Available regions for filtering
export const regions = ['All Regions', 'Northeast', 'Southeast', 'Midwest', 'Southwest', 'West'];

// Historical data for charts (12 months) — Gross figures
export const monthlyData = [
  { month: 'Jan', propertyPremiums: 245000, propertyClaims: 89000, autoPremiums: 312000, autoClaims: 156000 },
  { month: 'Feb', propertyPremiums: 238000, propertyClaims: 92000, autoPremiums: 298000, autoClaims: 142000 },
  { month: 'Mar', propertyPremiums: 251000, propertyClaims: 105000, autoPremiums: 325000, autoClaims: 178000 },
  { month: 'Apr', propertyPremiums: 259000, propertyClaims: 87000, autoPremiums: 318000, autoClaims: 165000 },
  { month: 'May', propertyPremiums: 267000, propertyClaims: 118000, autoPremiums: 335000, autoClaims: 189000 },
  { month: 'Jun', propertyPremiums: 273000, propertyClaims: 95000, autoPremiums: 342000, autoClaims: 172000 },
  { month: 'Jul', propertyPremiums: 281000, propertyClaims: 101000, autoPremiums: 356000, autoClaims: 198000 },
  { month: 'Aug', propertyPremiums: 275000, propertyClaims: 112000, autoPremiums: 348000, autoClaims: 185000 },
  { month: 'Sep', propertyPremiums: 289000, propertyClaims: 98000, autoPremiums: 361000, autoClaims: 176000 },
  { month: 'Oct', propertyPremiums: 295000, propertyClaims: 125000, autoPremiums: 375000, autoClaims: 205000 },
  { month: 'Nov', propertyPremiums: 302000, propertyClaims: 108000, autoPremiums: 382000, autoClaims: 192000 },
  { month: 'Dec', propertyPremiums: 311000, propertyClaims: 134000, autoPremiums: 395000, autoClaims: 215000 },
];

/**
 * Returns monthly chart data adjusted for Gross or Net basis.
 * Net = Gross after reinsurance (82% of premiums retained, 85% of claims retained).
 */
export const getMonthlyData = (isGross = true) => {
  if (isGross) return monthlyData;
  return monthlyData.map(month => ({
    ...month,
    propertyPremiums: Math.round(month.propertyPremiums * NET_PREMIUM_FACTOR),
    propertyClaims: Math.round(month.propertyClaims * NET_CLAIMS_FACTOR),
    autoPremiums: Math.round(month.autoPremiums * NET_PREMIUM_FACTOR),
    autoClaims: Math.round(month.autoClaims * NET_CLAIMS_FACTOR),
  }));
};

// Asset performance data for table
export const assetData = [
  {
    id: 'PROP-001',
    assetName: '123 Maple St Warehouse',
    category: 'Property',
    premiumDue: 12500,
    dueDate: '2025-02-15',
    totalClaims: 45000,
    region: 'Northeast',
    policyNumber: 'HP-2023-001',
  },
  {
    id: 'AUTO-001',
    assetName: '2022 Freightliner Cascadia',
    category: 'Auto',
    premiumDue: 3200,
    dueDate: '2025-02-01',
    totalClaims: 18500,
    region: 'Midwest',
    policyNumber: 'CA-2023-042',
  },
  {
    id: 'PROP-002',
    assetName: '456 Oak Ave Office Building',
    category: 'Property',
    premiumDue: 18900,
    dueDate: '2025-02-28',
    totalClaims: 72000,
    region: 'Southeast',
    policyNumber: 'HP-2022-156',
  },
  {
    id: 'AUTO-002',
    assetName: '2021 Ford F-150 Fleet (15 units)',
    category: 'Auto',
    premiumDue: 8500,
    dueDate: '2025-02-10',
    totalClaims: 34200,
    region: 'Southwest',
    policyNumber: 'CA-2023-089',
  },
  {
    id: 'PROP-003',
    assetName: '789 Pine St Retail Complex',
    category: 'Property',
    premiumDue: 22000,
    dueDate: '2025-03-05',
    totalClaims: 15000,
    region: 'West',
    policyNumber: 'HP-2024-003',
  },
  {
    id: 'AUTO-003',
    assetName: '2023 Tesla Model 3 Executive',
    category: 'Auto',
    premiumDue: 2800,
    dueDate: '2025-02-20',
    totalClaims: 8900,
    region: 'West',
    policyNumber: 'CA-2024-012',
  },
  {
    id: 'PROP-004',
    assetName: '321 Elm St Manufacturing Plant',
    category: 'Property',
    premiumDue: 35000,
    dueDate: '2025-02-05',
    totalClaims: 125000,
    region: 'Midwest',
    policyNumber: 'HP-2021-078',
  },
  {
    id: 'AUTO-004',
    assetName: '2020 Peterbilt 579 Semi',
    category: 'Auto',
    premiumDue: 4100,
    dueDate: '2025-03-01',
    totalClaims: 52000,
    region: 'Northeast',
    policyNumber: 'CA-2022-134',
  },
  {
    id: 'PROP-005',
    assetName: '555 Birch Ln Apartment Complex',
    category: 'Property',
    premiumDue: 28500,
    dueDate: '2025-02-12',
    totalClaims: 38000,
    region: 'Southeast',
    policyNumber: 'HP-2023-092',
  },
  {
    id: 'AUTO-005',
    assetName: '2022 RAM 2500 Contractor',
    category: 'Auto',
    premiumDue: 3600,
    dueDate: '2025-02-18',
    totalClaims: 12300,
    region: 'Southwest',
    policyNumber: 'CA-2023-167',
  },
  {
    id: 'PROP-006',
    assetName: '888 Cedar Rd Storage Facility',
    category: 'Property',
    premiumDue: 9500,
    dueDate: '2025-03-10',
    totalClaims: 5200,
    region: 'West',
    policyNumber: 'HP-2024-015',
  },
  {
    id: 'AUTO-006',
    assetName: '2021 Chevy Silverado Fleet (8 units)',
    category: 'Auto',
    premiumDue: 6200,
    dueDate: '2025-02-08',
    totalClaims: 28900,
    region: 'Midwest',
    policyNumber: 'CA-2023-201',
  },
  {
    id: 'PROP-007',
    assetName: '1010 Willow Way Shopping Center',
    category: 'Property',
    premiumDue: 42000,
    dueDate: '2025-02-25',
    totalClaims: 95000,
    region: 'Northeast',
    policyNumber: 'HP-2022-045',
  },
  {
    id: 'AUTO-007',
    assetName: '2023 Honda Accord Corporate',
    category: 'Auto',
    premiumDue: 2400,
    dueDate: '2025-03-12',
    totalClaims: 3500,
    region: 'Southeast',
    policyNumber: 'CA-2024-033',
  },
  {
    id: 'PROP-008',
    assetName: '2020 Spruce St Medical Center',
    category: 'Property',
    premiumDue: 55000,
    dueDate: '2025-02-03',
    totalClaims: 178000,
    region: 'Southwest',
    policyNumber: 'HP-2021-112',
  },
];

/**
 * Returns assets filtered by region.
 */
export const getFilteredAssets = (region = 'All Regions') => {
  if (region === 'All Regions') return assetData;
  return assetData.filter(a => a.region === region);
};

/**
 * Calculate summary statistics from any chart data array.
 * Pass the result of getMonthlyData(isGross) to respect Gross/Net basis.
 */
export const calculateSummaryStats = (chartData = monthlyData) => {
  const ytdPropertyPremiums = chartData.reduce((sum, month) => sum + month.propertyPremiums, 0);
  const ytdPropertyClaims = chartData.reduce((sum, month) => sum + month.propertyClaims, 0);
  const ytdAutoPremiums = chartData.reduce((sum, month) => sum + month.autoPremiums, 0);
  const ytdAutoClaims = chartData.reduce((sum, month) => sum + month.autoClaims, 0);

  const totalOwed = ytdPropertyPremiums + ytdAutoPremiums;
  const totalClaimed = ytdPropertyClaims + ytdAutoClaims;

  return {
    totalOwed,
    totalClaimed,
    propertyPremiums: ytdPropertyPremiums,
    propertyClaims: ytdPropertyClaims,
    autoPremiums: ytdAutoPremiums,
    autoClaims: ytdAutoClaims,
    lossRatio: ((totalClaimed / totalOwed) * 100).toFixed(1),
  };
};

// Utility function to format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Utility function to format date
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
