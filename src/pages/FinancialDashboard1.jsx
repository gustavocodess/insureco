import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  Button,
  Toggle,
  Dropdown,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  ContentSwitcher,
  Switch,
  Tag,
} from '@carbon/react';
import { ArrowLeft, ArrowUp, ArrowDown, WarningAlt } from '@carbon/icons-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';
import { getMonthlyData, getFilteredAssets, calculateSummaryStats, formatCurrency, formatDate, regions } from '../data/financialData';
import './FinancialDashboard1.scss';

const regionItems = regions.map(r => ({ id: r, label: r }));

export default function FinancialDashboard1() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const [chartType, setChartType] = useState('line');
  const [showGross, setShowGross] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [grossNetIndex, setGrossNetIndex] = useState(0);
  const [visibleSeries, setVisibleSeries] = useState({
    propertyPremiums: true,
    propertyClaims: true,
    autoPremiums: true,
    autoClaims: true,
  });

  // Theme-aware chart colors
  const chartColors = useMemo(() => ({
    axis: isDark ? '#c6c6c6' : '#525252',
    grid: isDark ? '#393939' : '#e0e0e0',
    tooltipBg: isDark ? '#262626' : '#ffffff',
    tooltipBorder: isDark ? '#525252' : '#e0e0e0',
    tooltipText: isDark ? '#f4f4f4' : '#161616',
  }), [isDark]);

  // Reactive data based on Gross/Net toggle
  const chartData = useMemo(() => getMonthlyData(showGross), [showGross]);
  const stats = useMemo(() => calculateSummaryStats(chartData), [chartData]);
  const filteredAssets = useMemo(() => getFilteredAssets(selectedRegion), [selectedRegion]);

  // High-risk assets from all assets (unaffected by region filter, shows global risk)
  const highRiskAssets = useMemo(() => {
    return getFilteredAssets(selectedRegion)
      .map(asset => ({
        ...asset,
        lossRatio: (asset.totalClaims / asset.premiumDue) * 100,
      }))
      .sort((a, b) => b.lossRatio - a.lossRatio)
      .slice(0, 5);
  }, [selectedRegion]);

  const headers = [
    { key: 'assetName', header: 'Asset Name' },
    { key: 'category', header: 'Category' },
    { key: 'premiumDue', header: 'Premium Due' },
    { key: 'dueDate', header: 'Due Date' },
    { key: 'totalClaims', header: 'Total Claims' },
    { key: 'region', header: 'Region' },
  ];

  const rows = filteredAssets.map((asset) => ({
    id: asset.id,
    assetName: asset.assetName,
    category: asset.category,
    premiumDue: formatCurrency(asset.premiumDue),
    dueDate: formatDate(asset.dueDate),
    totalClaims: formatCurrency(asset.totalClaims),
    region: asset.region,
    _raw: asset,
  }));

  const toggleSeries = (series) => {
    setVisibleSeries(prev => ({ ...prev, [series]: !prev[series] }));
  };

  const handleGrossNetSwitch = (index) => {
    setGrossNetIndex(index);
    setShowGross(index === 0);
  };

  const handleRowClick = (row) => {
    if (row._raw.category === 'Property') {
      navigate(`/business/properties/${row._raw.id}`, { state: { asset: row._raw } });
    } else {
      navigate(`/business/fleet/${row._raw.id}`, { state: { asset: row._raw } });
    }
  };

  const tooltipStyle = {
    background: chartColors.tooltipBg,
    border: `1px solid ${chartColors.tooltipBorder}`,
    color: chartColors.tooltipText,
    borderRadius: '4px',
  };

  return (
    <div className="financial-dashboard-1">
      <Grid fullWidth>
        {/* Page Header */}
        <Column lg={16} md={8} sm={4}>
          <div className="dashboard-header">
            <Button
              kind="ghost"
              size="sm"
              renderIcon={ArrowLeft}
              onClick={() => navigate('/financial-dashboards')}
              className="back-btn"
            >
              All Dashboard Options
            </Button>
            <div className="header-title-row">
              <div>
                <h1>Insurance Financial Analytics</h1>
                <p className="dashboard-subtitle">
                  Comprehensive overview of premium collections and claim payouts across Auto and Property portfolios
                </p>
              </div>
              <div className="header-controls">
                <ContentSwitcher
                  selectedIndex={grossNetIndex}
                  onChange={({ index }) => handleGrossNetSwitch(index)}
                  size="sm"
                >
                  <Switch name="gross" text="Gross" />
                  <Switch name="net" text="Net" />
                </ContentSwitcher>
                <Dropdown
                  id="region-filter"
                  label="All Regions"
                  items={regionItems}
                  itemToString={(item) => item?.label || ''}
                  selectedItem={regionItems.find(r => r.id === selectedRegion)}
                  onChange={({ selectedItem }) => setSelectedRegion(selectedItem?.id || 'All Regions')}
                  size="sm"
                />
              </div>
            </div>
            {!showGross && (
              <Tag type="blue" size="sm" className="net-badge">
                Net basis — after 18% reinsurance cession
              </Tag>
            )}
          </div>
        </Column>

        {/* KPI Summary Cards */}
        <Column lg={4} md={4} sm={4}>
          <Tile className="kpi-card kpi-card--primary">
            <div className="kpi-label">Total {showGross ? 'Gross' : 'Net'} Premiums (YTD)</div>
            <div className="kpi-value">{formatCurrency(stats.totalOwed)}</div>
            <div className="kpi-change kpi-change--positive">
              <ArrowUp size={16} />
              <span>8.2% vs last year</span>
            </div>
          </Tile>
        </Column>

        <Column lg={4} md={4} sm={4}>
          <Tile className="kpi-card kpi-card--danger">
            <div className="kpi-label">Total {showGross ? 'Gross' : 'Net'} Claims (YTD)</div>
            <div className="kpi-value">{formatCurrency(stats.totalClaimed)}</div>
            <div className="kpi-change kpi-change--negative">
              <ArrowUp size={16} />
              <span>12.5% vs last year</span>
            </div>
          </Tile>
        </Column>

        <Column lg={4} md={4} sm={4}>
          <Tile className="kpi-card kpi-card--neutral">
            <div className="kpi-label">Property</div>
            <div className="kpi-value kpi-value--md">{formatCurrency(stats.propertyPremiums)}</div>
            <div className="kpi-subtitle">
              <span className="kpi-subtitle-label">Claims:</span>
              <span className="kpi-subtitle-value kpi-subtitle-value--red">{formatCurrency(stats.propertyClaims)}</span>
            </div>
          </Tile>
        </Column>

        <Column lg={4} md={4} sm={4}>
          <Tile className="kpi-card kpi-card--neutral">
            <div className="kpi-label">Auto</div>
            <div className="kpi-value kpi-value--md">{formatCurrency(stats.autoPremiums)}</div>
            <div className="kpi-subtitle">
              <span className="kpi-subtitle-label">Claims:</span>
              <span className="kpi-subtitle-value kpi-subtitle-value--red">{formatCurrency(stats.autoClaims)}</span>
            </div>
          </Tile>
        </Column>

        {/* Loss Ratio Banner */}
        <Column lg={16} md={8} sm={4}>
          <div className={`loss-ratio-banner ${parseFloat(stats.lossRatio) > 60 ? 'loss-ratio-banner--high' : 'loss-ratio-banner--ok'}`}>
            <span className="loss-ratio-label">Portfolio Loss Ratio</span>
            <span className="loss-ratio-value">{stats.lossRatio}%</span>
            <span className="loss-ratio-desc">
              {parseFloat(stats.lossRatio) > 60 ? 'Above threshold — review high-risk assets below' : 'Within acceptable range'}
            </span>
          </div>
        </Column>

        {/* Chart Section */}
        <Column lg={16} md={8} sm={4}>
          <Tile className="chart-tile">
            <div className="chart-header">
              <div>
                <h3>Premium vs Claims Trend</h3>
                <p className="chart-subtitle">Monthly {showGross ? 'gross' : 'net'} figures — 12-month view</p>
              </div>
              <div className="chart-controls">
                <div className="legend-toggles">
                  <button
                    className={`series-btn ${visibleSeries.propertyPremiums ? 'series-btn--green' : 'series-btn--off'}`}
                    onClick={() => toggleSeries('propertyPremiums')}
                  >
                    Prop. Premiums
                  </button>
                  <button
                    className={`series-btn ${visibleSeries.propertyClaims ? 'series-btn--red' : 'series-btn--off'}`}
                    onClick={() => toggleSeries('propertyClaims')}
                  >
                    Prop. Claims
                  </button>
                  <button
                    className={`series-btn ${visibleSeries.autoPremiums ? 'series-btn--green-alt' : 'series-btn--off'}`}
                    onClick={() => toggleSeries('autoPremiums')}
                  >
                    Auto Premiums
                  </button>
                  <button
                    className={`series-btn ${visibleSeries.autoClaims ? 'series-btn--red-alt' : 'series-btn--off'}`}
                    onClick={() => toggleSeries('autoClaims')}
                  >
                    Auto Claims
                  </button>
                </div>
                <Toggle
                  id="chart-type-toggle-1"
                  labelA="Line"
                  labelB="Bar"
                  toggled={chartType === 'bar'}
                  onToggle={(checked) => setChartType(checked ? 'bar' : 'line')}
                  size="sm"
                />
              </div>
            </div>

            <div className="chart-container">
              <ResponsiveContainer width="100%" height={380}>
                {chartType === 'line' ? (
                  <LineChart data={chartData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                    <XAxis dataKey="month" tick={{ fill: chartColors.axis, fontSize: 12 }} axisLine={{ stroke: chartColors.grid }} tickLine={false} />
                    <YAxis tick={{ fill: chartColors.axis, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ color: chartColors.axis }} />
                    {visibleSeries.propertyPremiums && (
                      <Line type="monotone" dataKey="propertyPremiums" stroke="#24a148" strokeWidth={2} name="Property Premiums" dot={false} />
                    )}
                    {visibleSeries.propertyClaims && (
                      <Line type="monotone" dataKey="propertyClaims" stroke="#da1e28" strokeWidth={2} name="Property Claims" dot={false} />
                    )}
                    {visibleSeries.autoPremiums && (
                      <Line type="monotone" dataKey="autoPremiums" stroke="#198038" strokeWidth={2} strokeDasharray="5 5" name="Auto Premiums" dot={false} />
                    )}
                    {visibleSeries.autoClaims && (
                      <Line type="monotone" dataKey="autoClaims" stroke="#a2191f" strokeWidth={2} strokeDasharray="5 5" name="Auto Claims" dot={false} />
                    )}
                  </LineChart>
                ) : (
                  <BarChart data={chartData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                    <XAxis dataKey="month" tick={{ fill: chartColors.axis, fontSize: 12 }} axisLine={{ stroke: chartColors.grid }} tickLine={false} />
                    <YAxis tick={{ fill: chartColors.axis, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => formatCurrency(value)} contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ color: chartColors.axis }} />
                    {visibleSeries.propertyPremiums && <Bar dataKey="propertyPremiums" fill="#24a148" name="Property Premiums" />}
                    {visibleSeries.propertyClaims && <Bar dataKey="propertyClaims" fill="#da1e28" name="Property Claims" />}
                    {visibleSeries.autoPremiums && <Bar dataKey="autoPremiums" fill="#198038" name="Auto Premiums" />}
                    {visibleSeries.autoClaims && <Bar dataKey="autoClaims" fill="#a2191f" name="Auto Claims" />}
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </Tile>
        </Column>

        {/* High Risk Assets */}
        <Column lg={16} md={8} sm={4}>
          <div className="high-risk-section">
            <div className="section-header">
              <div className="section-title-group">
                <WarningAlt size={20} className="warning-icon" />
                <h2>High Risk Assets</h2>
                <Tag type="red" size="sm">{highRiskAssets.length} assets</Tag>
              </div>
              <p className="section-description">Highest claims-to-premium ratios — sorted by loss ratio</p>
            </div>

            <div className="high-risk-grid">
              {highRiskAssets.map((asset) => (
                <Tile
                  key={asset.id}
                  className="high-risk-card"
                  onClick={() => {
                    if (asset.category === 'Property') {
                      navigate(`/business/properties/${asset.id}`, { state: { asset } });
                    } else {
                      navigate(`/business/fleet/${asset.id}`, { state: { asset } });
                    }
                  }}
                >
                  <div className="risk-card-header">
                    <span className={`risk-category risk-category--${asset.category.toLowerCase()}`}>
                      {asset.category}
                    </span>
                    <span className="risk-region">{asset.region}</span>
                  </div>
                  <h3 className="risk-asset-name">{asset.assetName}</h3>
                  <div className="risk-metrics">
                    <div className="risk-metric">
                      <span className="metric-label">Loss Ratio</span>
                      <span className="metric-value metric-value--danger">{asset.lossRatio.toFixed(1)}%</span>
                    </div>
                    <div className="risk-divider" />
                    <div className="risk-metric">
                      <span className="metric-label">Total Claims</span>
                      <span className="metric-value">{formatCurrency(asset.totalClaims)}</span>
                    </div>
                    <div className="risk-divider" />
                    <div className="risk-metric">
                      <span className="metric-label">Premium Due</span>
                      <span className="metric-value">{formatCurrency(asset.premiumDue)}</span>
                    </div>
                  </div>
                  <div className="risk-bar-container">
                    <div className="risk-bar" style={{ width: `${Math.min(asset.lossRatio, 100)}%` }} />
                  </div>
                  <span className="view-details-link">View Details →</span>
                </Tile>
              ))}
            </div>
          </div>
        </Column>

        {/* Asset Performance Table */}
        <Column lg={16} md={8} sm={4}>
          <DataTable rows={rows} headers={headers} isSortable>
            {({
              rows: tableRows,
              headers: tableHeaders,
              getHeaderProps,
              getRowProps,
              getTableProps,
              getTableContainerProps,
              getToolbarProps,
              onInputChange,
            }) => (
              <TableContainer
                title="Asset Performance Ledger"
                description={`${filteredAssets.length} assets${selectedRegion !== 'All Regions' ? ` in ${selectedRegion}` : ''} — click any row to view details`}
                {...getTableContainerProps()}
              >
                <TableToolbar {...getToolbarProps()}>
                  <TableToolbarContent>
                    <TableToolbarSearch onChange={onInputChange} placeholder="Search assets..." />
                  </TableToolbarContent>
                </TableToolbar>
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      {tableHeaders.map((header) => (
                        <TableHeader {...getHeaderProps({ header })} key={header.key}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableRows.map((row) => (
                      <TableRow
                        {...getRowProps({ row })}
                        key={row.id}
                        onClick={() => handleRowClick(row)}
                        className="clickable-row"
                      >
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
        </Column>
      </Grid>
    </div>
  );
}
