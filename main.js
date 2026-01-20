import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import nodeHtmlLabel from 'cytoscape-node-html-label';

cytoscape.use(dagre);
nodeHtmlLabel(cytoscape);

const elements = [
    // Suppliers (Column 1)
    { data: { id: 'yeast_plant', label: 'Yeast Plant', subtitle: 'Marcq-en-Barœul, France', items: [{name: 'yeast', val: '2'}, {name: 'levain starter', val: '3'}] } },
    { data: { id: 'cocoa_import', label: 'Cocoa Import', subtitle: 'Antwerpen, Belgium', items: [{name: 'chocolate', val: '4'}, {name: 'chocolate batons', val: '5'}] } },
    { data: { id: 'citrus_import', label: 'Citrus Import', subtitle: 'Catania, Sicily, Italy', items: [{name: 'candied orange peel', val: '2'}, {name: 'lemon zest', val: '1'}] } },

    // Compound Node: Grain Belt (Column 2)
    { data: { id: 'grain_belt', label: 'North-East Grain Belt' } },
    { data: { id: 'grain_coop', parent: 'grain_belt', label: 'Grain Cooperative', subtitle: 'Reims, Grand Est', items: [{name: 'wheat grain', val: '3'}, {name: 'rye grain', val: '2'}, {name: 'barley grain', val: '4'}] } },
    { data: { id: 'grain_producers', parent: 'grain_belt', label: 'Mixed Grain Producers', subtitle: 'Dijon, Bourgogne-Franche-Comté', items: [{name: 'spelt grain', val: '1'}, {name: 'soft wheat', val: '5'}] } },
    { data: { id: 'river_mill', parent: 'grain_belt', label: 'River Mill', subtitle: 'Strasbourg, Grand Est', items: [{name: 'wheat flour T55', val: '4'}, {name: 'wheat flour T45', val: '4'}] } },

    // Atlantic Dairy (Column 2/3 offset)
    { data: { id: 'atlantic_dairy', label: 'Atlantic Dairy Coast' } },
    { data: { id: 'dairy_collective', parent: 'atlantic_dairy', label: 'Dairy Collective', subtitle: 'Caen, Normandie', items: [{name: 'whole milk', val: '3'}, {name: 'cream', val: '4'}, {name: 'butter', val: '5'}] } },
    { data: { id: 'egg_farm', parent: 'atlantic_dairy', label: 'Egg Farm', subtitle: 'Vitré, Bretagne', items: [{name: 'eggs', val: '2'}, {name: 'egg whites', val: '1'}] } },

    // Urban Bakeries (Column 4)
    { data: { id: 'urban_bakeries', label: 'Urban Bakeries' } },
    { data: { id: 'artisan_bakery', parent: 'urban_bakeries', label: 'Artisan Bakery', subtitle: 'Paris, Île-de-France', items: [{name: 'baguette traditionnelle', val: '5'}, {name: 'pain au levain', val: '2'}] } },
    { data: { id: 'patisserie', parent: 'urban_bakeries', label: 'Pâtisserie', subtitle: 'Paris, Île-de-France', items: [{name: 'croissant', val: '4'}, {name: 'pain au chocolat', val: '3'}] } },

    // Northern Gateways (Column 5)
    { data: { id: 'northern_gateways', label: 'Northern Gateways' } },
    { data: { id: 'dist_hub', parent: 'northern_gateways', label: 'Distribution Hub', subtitle: 'Calais, Hauts-de-France', items: [{name: 'baked goods shipment', val: '1'}, {name: 'pâtisserie shipment', val: '3'}] } },
    { data: { id: 'export_terminal', parent: 'northern_gateways', label: 'Export Terminal', subtitle: 'Le Havre, Normandie', items: [{name: 'refrigerated containers', val: '2'}] } },

    // Retail Hubs (Column 6)
    { data: { id: 'retail_hubs', label: 'Retail Hubs' } },
    { data: { id: 'bakery_shop', parent: 'retail_hubs', label: 'Bakery Shop', subtitle: 'Paris, Île-de-France', items: [{name: 'baguette', val: '2'}, {name: 'brioche', val: '4'}] } },
    { data: { id: 'supermarket', parent: 'retail_hubs', label: 'Supermarket', subtitle: 'Orléans, Centre-Val de Loire', items: [{name: 'sliced bread', val: '4'}] } },

    // Edges
    { data: { source: 'yeast_plant', target: 'artisan_bakery' } },
    { data: { source: 'yeast_plant', target: 'patisserie' } },
    { data: { source: 'cocoa_import', target: 'patisserie' } },
    { data: { source: 'citrus_import', target: 'patisserie' } },
    { data: { source: 'grain_coop', target: 'river_mill' } },
    { data: { source: 'grain_producers', target: 'river_mill' } },
    { data: { source: 'river_mill', target: 'artisan_bakery' } },
    { data: { source: 'dairy_collective', target: 'patisserie' } },
    { data: { source: 'dairy_collective', target: 'artisan_bakery' } },
    { data: { source: 'egg_farm', target: 'patisserie' } },
    { data: { source: 'artisan_bakery', target: 'dist_hub' } },
    { data: { source: 'patisserie', target: 'dist_hub' } },
    { data: { source: 'dist_hub', target: 'bakery_shop' } },
    { data: { source: 'dist_hub', target: 'supermarket' } },
    { data: { source: 'export_terminal', target: 'supermarket' } },
];

const cy = cytoscape({
    container: document.getElementById('cy'),
    elements: elements,
    style: [
        {
            selector: 'node',
            style: {
                'width': 200,
                'height': 120, // Increased height to better fit typical content
                'shape': 'rectangle',
                'opacity': 0
            }
        },
        {
            selector: '$node > node', // Compound nodes
            style: {
                'background-color': '#f8fafc',
                'background-opacity': 0.5,
                'border-width': 2,
                'border-color': '#e2e8f0',
                'border-style': 'solid',
                'shape': 'roundrectangle',
                'opacity': 1,
                'padding': 60
            }
        },
        {
            selector: 'edge',
            style: {
                'width': 3,
                'line-color': '#475569',
                'target-arrow-color': '#475569',
                'target-arrow-shape': 'triangle',
                'curve-style': 'taxi',
                'taxi-direction': 'horizontal',
                'taxi-turn': 40,
                'taxi-turn-min-distance': 20,
                'opacity': 0.8,
                'arrow-scale': 1.5
            }
        }
    ],
    layout: {
        name: 'dagre',
        rankDir: 'LR',
        nodeSep: 150,
        rankSep: 300,
        padding: 100
    }
});

cy.nodeHtmlLabel([
    {
        query: 'node:childless',
        halign: 'center',
        valign: 'center',
        halignBox: 'center',
        valignBox: 'center',
        tpl: function (data) {
            const itemsHtml = data.items ? data.items.map(item => `
                <div class="item-row">
                    <span class="item-name">${item.name}</span>
                    <span class="item-value">${item.val}</span>
                </div>
            `).join('') : '';

            return `
                <div class="node-card">
                    <div class="node-header">
                        <div class="node-icon"></div>
                        <div>
                            <div class="node-title">${data.label}</div>
                            <div class="node-subtitle">${data.subtitle || ''}</div>
                        </div>
                    </div>
                    <div class="node-content">
                        <div class="item-list">
                            ${itemsHtml}
                        </div>
                    </div>
                </div>
            `;
        }
    },
    {
        query: '$node > node', // Compound nodes
        halign: 'center',
        valign: 'top',
        halignBox: 'center',
        valignBox: 'top',
        tpl: function (data) {
            return `<div class="compound-label">${data.label}</div>`;
        }
    }
]);
