import { ResponsivePie } from '@nivo/pie'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// you'll often use just a few of them.

export const PIE_DATA =[
    {
      "id": "Yes",
      "label": "Yes",
      "value": 0,
      "color": "#2e7d32"
    },
    {
      "id": "No",
      "label": "No",
      "value": 0,
      "color": "orange"
    },
  ]

const PieChart = ({ data }) => (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 60, bottom: 60, left: 60 }}
        innerRadius={0.4}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ datum: 'data.color' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#000"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#fff"
        radialLabelsLinkStrokeWidth={5}
        labelFormat={v => `${v}%`}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'hsl(123, 46%, 34%)',
                size: 4,
                padding: 1,
                stagger: true
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Yes'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'no'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 50,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000',
                        }
                    }
                ]
            }
        ]}
    />
)

export default PieChart;