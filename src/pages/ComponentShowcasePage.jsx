import React, { useState } from 'react';
import {
  Grid,
  Column,
  Tile,
  Heading,
  Stack,
  Accordion,
  AccordionItem,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tooltip,
  Button,
  Modal,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import { Information } from '@carbon/icons-react';
import './ComponentShowcasePage.scss';

const tableHeaders = [
  { key: 'name', header: 'Vehicle' },
  { key: 'type', header: 'Type' },
  { key: 'status', header: 'Status' },
  { key: 'premium', header: 'Monthly Premium' },
];

const tableRows = [
  { id: 'row-1', name: 'Ford Transit', type: 'Cargo Van', status: 'Active', premium: '$185' },
  { id: 'row-2', name: 'Chevy Silverado', type: 'Pickup Truck', status: 'Active', premium: '$210' },
  { id: 'row-3', name: 'Freightliner M2', type: 'Box Truck', status: 'Maintenance', premium: '$340' },
];

export default function ComponentShowcasePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Grid className="component-showcase-page">
      <Column lg={16} md={8} sm={4}>
        <header className="component-showcase-header">
          <Heading className="component-showcase-title">Component Showcase</Heading>
          <p className="component-showcase-subtitle">
            A quick reference of Accordion, Tabs, Tooltip, Modal, and DataTable
          </p>
        </header>
      </Column>

      {/* Accordion */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="showcase-section">
          <Heading as="h3" className="showcase-section-title">Accordion</Heading>
          <Accordion>
            <AccordionItem title="What is covered under my policy?">
              <p>Your policy covers collision, liability, and comprehensive damage as outlined in your plan.</p>
            </AccordionItem>
            <AccordionItem title="How do I file a claim?">
              <p>You can file a claim from the Business dashboard under Claims, or by calling support.</p>
            </AccordionItem>
            <AccordionItem title="When is my premium due?">
              <p>Premiums are billed monthly on the date your policy was originally issued.</p>
            </AccordionItem>
          </Accordion>
        </Tile>
      </Column>

      {/* Tabs */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="showcase-section">
          <Heading as="h3" className="showcase-section-title">Tabs</Heading>
          <Tabs>
            <TabList aria-label="Showcase tabs">
              <Tab>Overview</Tab>
              <Tab>Coverage</Tab>
              <Tab>Documents</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>Summary information about the selected policy or asset.</p>
              </TabPanel>
              <TabPanel>
                <p>Details on the coverage limits, deductibles, and add-ons.</p>
              </TabPanel>
              <TabPanel>
                <p>Uploaded documents and policy paperwork.</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Tile>
      </Column>

      {/* Tooltip */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="showcase-section">
          <Heading as="h3" className="showcase-section-title">Tooltip</Heading>
          <Stack gap={5} orientation="horizontal" className="showcase-tooltip-row">
            <Tooltip label="Your deductible is the amount you pay before coverage kicks in.">
              <button className="showcase-tooltip-trigger" type="button">
                <Information size={16} />
                <span>Deductible</span>
              </button>
            </Tooltip>
            <Tooltip label="Premiums are recalculated annually based on your claims history.">
              <button className="showcase-tooltip-trigger" type="button">
                <Information size={16} />
                <span>Premium</span>
              </button>
            </Tooltip>
          </Stack>
        </Tile>
      </Column>

      {/* Modal */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="showcase-section">
          <Heading as="h3" className="showcase-section-title">Modal</Heading>
          <Button kind="primary" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
          <Modal
            open={isModalOpen}
            modalHeading="Confirm cancellation"
            primaryButtonText="Confirm"
            secondaryButtonText="Cancel"
            danger
            onRequestClose={() => setIsModalOpen(false)}
            onRequestSubmit={() => setIsModalOpen(false)}
          >
            <p>Are you sure you want to cancel this policy? This action cannot be undone.</p>
          </Modal>
        </Tile>
      </Column>

      {/* DataTable */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="showcase-section">
          <Heading as="h3" className="showcase-section-title">DataTable</Heading>
          <DataTable rows={tableRows} headers={tableHeaders}>
            {({ rows, headers, getHeaderProps, getTableProps, getRowProps }) => (
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })} key={header.key}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow {...getRowProps({ row })} key={row.id}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataTable>
        </Tile>
      </Column>
    </Grid>
  );
}
