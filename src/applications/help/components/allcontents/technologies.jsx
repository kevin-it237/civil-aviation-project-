import React from 'react'
import { Typography, Divider  } from 'antd';
import './styles.scss'
const { Title, Text, Link, Paragraph } = Typography;

/**
 * @description content
 */

const Technologies = ({page}) => {

    return (
        <div className="help-content-text">
            <Title style={{color: "#1890ff"}} level={3}>{page}</Title>
            <Divider />
            <Title level={5}>ElectronJs</Title>
            <Text>electron is an environment for developing cross-platform desktop applications with web technologies (JavaScript, HTML and CSS).The infrastructure (backend) is coded in node.js, and the interface (frontend) is built on Chromium tools, the open source part of Google Chrome3.Electron is free, open source software developed by GitHub under the MIT license. Electron has notably helped develop the free text editors Atom from GitHub and Visual Studio Code from Microsoft.</Text>
            
            <Title level={5}>NodeJs</Title>
            <Text>Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the Chrome V8 engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser. Consequently, Node.js represents a "JavaScript everywhere" paradigm, unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts.</Text>
            
            <Title level={5}>ExpressJs</Title>
            <Text>Node (or more formally Node.js) is an open-source, cross-platform runtime environment that allows developers to build all kinds of server-side applications and tools in JavaScript. This environment is intended to be used outside the browser (it runs directly on his computer or in the operating system of the server). It ignores browser-related JavaScript APIs and adds support for more traditional APIs, including HTTP and system file libraries.</Text>

            <Title level={5}>MySQL</Title>
            <Text>MySQL is an open-source relational database management system (RDBMS). Its name is a combination of "My", the name of co-founder Michael Widenius's daughter, and "SQL", the abbreviation for Structured Query Language. A relational database organizes data into one or more data tables in which data types may be related to each other; these relations help structure the data. SQL is a language programmers use to create, modify and extract data from the relational database, as well as control user access to the database. In addition to relational databases and SQL, an RDBMS like MySQL works with an operating system to implement a relational database in a computer's storage system, manages users, allows for network access and facilitates testing database integrity and creation of backups. MySQL is free and open-source software under the terms of the GNU General Public License, and is also available under a variety of proprietary licenses.</Text>
            
            <Title level={5}>Sequelize</Title>
            <Text>Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more. Sequelize is a powerful library in Javascript that makes it easy to manage a SQL database. It is an Object-Relational Mapper – meaning that it maps an object syntax onto our database schemas. Sequelize uses Node</Text>
            
            <Title level={5}>ReactJs</Title>
            <Text>ReactJS is JavaScript library used for building reusable UI components. According to React official documentation, following is the definition − React is a library for building composable user interfaces. It encourages the creation of reusable UI components, which present data that changes over time. Lots of people use React as the V in MVC. React abstracts away the DOM from you, offering a simpler programming model and better performance. React can also render on the server using Node, and it can power native apps using React Native. React implements one-way reactive data flow, which reduces the boilerplate and is easier to reason about than traditional data binding.</Text>
            
            <Title level={5}>HighCharts</Title>
            <Text>A JS library released in 2009 JS, based on SVG with fallbacks to VML and Canvas for old browsers. It offers a whole ecosystem of different project templates. Highcharts is compatible with older browsers, too, including Internet Explorer 6. It’s a nice solution for non-developers as it has an integrated WYSIWYG (what you see is what you get) chart editor. Its learning curve is rather smooth and it’s been used by a number of major players, like Facebook or Microsoft—there’ve even been claims that 72 out of the 100 of the world’s largest companies have used it at some point.</Text>

            <Title level={5}>Nivo</Title>
            <Text>Nivo is a beautiful framework built on top of D3 and React, offering fourteen different types of components to present your data with. It was released in 2017, featured as product of the day on ProductHunt on August 20, 2017. Nivo offers a lot of customization options and three rendering options: Canvas, SVG, and even API-based HTML. The documentation is exceptional and the demos are configurable and fun. It’s a high-level library and quite simple, but offers less potential for custom visualizations.</Text>
            
            <Title level={5}>React Redux</Title>
            <Text>Redux is a predictable state container designed to help you write JavaScript apps that behave consistently across client, server, and native environments and are easy to test. While it's mostly used as a state management tool with React, you can use it with any other JavaScript framework or library.</Text>

            <Title level={5}>Ant Design</Title>
            <Text>Ant Design is a React UI library that has a plethora of easy-to-use components that are useful for building elegant user interfaces.</Text>
        </div>
    )
}


export default Technologies

