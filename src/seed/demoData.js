

let possibilities = {
    region: [
        'WEST','NORTH','EAST', 'SOUTH'
    ],
    agency: [
        'AGENCY 1', 'AGENCY 2', 'AGENCY 3'
    ],
    country: [
        'BRAZIL', 'USA', 'CHINA', 'JAPAN',
    ],
    sector: [
        'CONSTRUCTION', 'FINANCIAL'
    ],
    category: [
        'INTERN', 'EXTERN', 'PENDENT'
    ],
    procurement_method: [
        'LOCAL', 'LICITATION'
    ],
    review_type: [
        'MANUAL', 'AUTOMATIC',
    ],
    market_approach: [
        5000, 10000, 100000, 1000000
    ],
    procurement_process: [
        'ONLINE', 'OFFLINE',
    ],
};

function randomDate() {
    const [start,end] = [new Date(2012, 0, 1), new Date()];
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function buildData(name='cod'){
    let data = [


    ];
    for(let x = 0; x < 1000; x++){
        let r = {};
        r[name] = x;
        data.push({
            ...r,
            regions: possibilities.region[Math.floor(Math.random() * 4)],
            agencies: possibilities.agency[Math.floor(Math.random() * 3)],
            countries: possibilities.country[Math.floor(Math.random() * 4)],
            sectors: possibilities.sector[Math.floor(Math.random() * 2)],
            procurementCategory: possibilities.category[Math.floor(Math.random() * 3)],
            procurementMethod: possibilities.procurement_method[Math.floor(Math.random() * 2)],
            reviewType: possibilities.review_type[Math.floor(Math.random() * 2)],
            marketApproach: possibilities.market_approach[Math.floor(Math.random() * 4)],
            procurementProcess: possibilities.procurement_process[Math.floor(Math.random() * 2)],
            plannedYear: 2021 + Math.floor(Math.random() * 10),
            actualYear: 2021 + Math.floor(Math.random() * 10),
            projects: "Project nome de teste geração "+x,
            // last_updated_on: randomDate().toLocaleString('en-US')
        });
    }
    return data;
}


export default function(name='cod'){
    return buildData(name);
};