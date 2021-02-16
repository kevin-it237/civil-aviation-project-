import { ResponsiveBar } from '@nivo/bar'


const BarChart = ({ data, keys, groupMode, legend }) => (
    <ResponsiveBar
        data={data}
        keys={keys}
        indexBy="country"
        margin={{ top: 20, right: 50, bottom: 20, left: 150 }}
        padding={0.4}
        groupMode={groupMode ? "stacked":"grouped"}
        layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ id, data }) => data[`${id}Color`]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        colorBy="id"
        labelFormat={v => `${v.toFixed(2)}%`}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32,
            format: v => `${v}%`
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40,
        }}
        enableGridY={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 2.2 ] ] }}
        legends={legend ?[
            {
                dataFrom: 'keys',
                anchor: 'top-center',
                direction: 'row',
                justify: false,
                translateX: -20,
                translateY: -20,
                itemsSpacing: 2,
                itemWidth: 200,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]:[]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)

export default BarChart