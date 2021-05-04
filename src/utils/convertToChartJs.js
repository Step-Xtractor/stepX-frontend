export default function convertToChartJs(data){
    let ret = data.map(e=>{
        let x = [{}];
        if(e.totalCount?.length>0){
            x[0].count = e.totalCount[0].count;
        }
        if(e?.totalMonetaryValue?.length > 0){
            x[0].monetaryValue = e.totalMonetaryValue[0].monetaryValue;
        }
        if(e?.percentage?.length > 0){
            x[0].percentage = e.totalPercentage[0].percentage;
        }
        return x.concat(e.data.map(e=>{
            return {
                _id: e._id ? e._id : e.procurementCategory ? e.procurementCategory : 'Uncategorized',
                count: e.count,
                monetaryValue: e.monetaryValue,
                percentage:  e.percentage && e.percentage.toFixed ? Number(e.percentage.toFixed(2)):null,
                total: e.total,
            }
        }));
    }).flat().map(e=>{
        return {
            label: e._id ? e._id : '$ Total',
            value: e.count,
            monetaryValue: e.monetaryValue,
            percentage: e.percentage && e.percentage.toFixed ? Number(e.percentage.toFixed(2)): null,
            total: e.total,
        }
    }).sort((e,b)=>{
        return e.label.localeCompare(b.label)
    });
    ret[0]['label'] = 'Total';
    return ret;
}