import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Chart } from 'react-google-charts';
import Layout from '../components/layout/layout';
import { CONTAINER, sampleData } from '../utils';

const Home: NextPage = () => {
    const [data, setData] = useState([
        ['Product', 'Rating'] as (string|number)[]
    ].concat(sampleData.products.map((p) => {
        return [p.title, p.rating];
    })));

    useEffect(() => {
        setTimeout(() => {
            setData([
                ['Product', 'Price'] as (string|number)[]
            ].concat(sampleData.products.map((p) => {
                return [p.title, p.price];
            })));
        }, 4000);
    }, []);
    const pieEl = useRef<HTMLDivElement>(null);
    const barEl = useRef<HTMLDivElement>(null);
    const draw = useMemo(() => () => {
        const data = new google.visualization.DataTable();
        const options = {
            title: 'Products',
            width: 400,
            height: 300,
        };

        data.addColumn('string', 'Product');
        data.addColumn('number', 'Price');
        data.addRows(sampleData.products.map((p) => {
            return [p.title, p.price];
        }));

        const oData = google.visualization.arrayToDataTable([
            ['Product', 'Rating'] as (string|number)[]
        ].concat(sampleData.products.map((p) => {
            return [p.title, p.rating];
        })));

        const pieChart = new google.visualization.PieChart(pieEl.current as HTMLElement);
        const barChart = new google.visualization.BarChart(barEl.current as HTMLElement);

        pieChart.draw(data, options);
        barChart.draw(data, options);
    }, []);

    useEffect(() => {
        google.charts.load('current', {
            packages: ['corechart'],
        });

        google.charts.setOnLoadCallback(draw);
    }, []);

    return (
        <Layout
            title="Covalence | Home"
            description="Premium, online, software education">
            <Head>
                <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
            </Head>
            <section className={CONTAINER}>
                <div className="text-center py-10">
                    <h1 className="text-3xl font-semibold">Hello World!</h1>
                    <h2 className="text-xl text-gray-500 font-medium">
                        {' '}
                        - Covalence
                    </h2>
                </div>
            </section>
            <section className="text-center py-10 grid grid-cols-2 gap-32">
                <div ref={pieEl}></div>
                <div ref={barEl}></div>
                <Chart
                   chartType="PieChart"
                   data={data}
                   options={{
                    title: 'Products',
                    width: 400,
                    height: 300,
                   }} />
                <Chart
                   chartType="BarChart"
                   data={data}
                   options={{
                    title: 'Products',
                    width: 400,
                    height: 300,
                   }} />
            </section>
        </Layout>
    );
};

export default Home;
