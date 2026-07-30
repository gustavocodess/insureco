import React, { useState } from 'react';
import { Grid, Column, Tile, Heading } from '@carbon/react';
import FacetedFilterButton from '../components/business/FacetedFilterButton';
import './FacetedFilterPreview.scss';

const vehicleTypeOptions = [
  { value: 'box-truck', label: 'Box Truck', count: 13 },
  { value: 'cargo-van', label: 'Cargo Van', count: 13 },
  { value: 'compact-van', label: 'Compact Van', count: 13 },
  { value: 'cutaway-van', label: 'Cutaway Van', count: 13 },
  { value: 'heavy-duty-van', label: 'Heavy Duty Van', count: 13 },
  { value: 'passenger-van', label: 'Passenger Van', count: 13 },
  { value: 'pickup-truck', label: 'Pickup Truck', count: 13 },
  { value: 'suv', label: 'SUV', count: 13 },
  { value: 'semi-truck', label: 'Semi Truck', count: 13 }
];

const statusOptions = [
  { value: 'active', label: 'Active', count: 42 },
  { value: 'inactive', label: 'Inactive', count: 9 },
  { value: 'maintenance', label: 'Maintenance', count: 5 }
];

const departmentOptions = [
  { value: 'logistics', label: 'Logistics', count: 21 },
  { value: 'sales', label: 'Sales', count: 14 },
  { value: 'operations', label: 'Operations', count: 22 }
];

const facets = [
  { key: 'status', label: 'Status', options: statusOptions },
  { key: 'vehicleType', label: 'Vehicle Type', options: vehicleTypeOptions },
  { key: 'department', label: 'Department', options: departmentOptions }
];

export default function FacetedFilterPreview() {
  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    vehicleType: [],
    department: []
  });

  return (
    <Grid className="faceted-filter-preview">
      <Column lg={16} md={8} sm={4}>
        <header className="faceted-filter-preview-header">
          <Heading className="faceted-filter-preview-title">
            Cascading Filter Menu
          </Heading>
          <p className="faceted-filter-preview-subtitle">
            Preview of the FacetedFilterButton component
          </p>
        </header>
      </Column>

      <Column lg={16} md={8} sm={4}>
        <Tile className="faceted-filter-preview-demo">
          <div className="faceted-filter-preview-trigger">
            <FacetedFilterButton
              label="Filter Vehicles"
              facets={facets}
              selectedFilters={selectedFilters}
              onFiltersChange={setSelectedFilters}
            />
          </div>
        </Tile>
      </Column>
    </Grid>
  );
}
