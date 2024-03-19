const sql = require('mssql');

const config = {
    user: 'MSc_IoT_admin', // better stored in an app setting such as process.env.DB_USER
    password: 'Do-not-use-this-password1!', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'medisync.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'exampleDatabase', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

/*
    //Use Azure VM Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-vm'
        },
        options: {
            encrypt: true
        }
    }

    //Use Azure App Service Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-app-service'
        },
        options: {
            encrypt: true
        }
    }
*/

console.log("Starting...");
connectAndQuery();

// async function connectAndQuery() {
//     try {
//         var poolConnection = await sql.connect(config);

//         console.log("Reading rows from the Table...");
//         var resultSet = await poolConnection.request().query(`SELECT * FROM [dbo].[Plants];`);

//         console.log(`${resultSet.recordset.length} rows returned.`);

//         // output column headers
//         var columns = "";
//         for (var column in resultSet.recordset.columns) {
//             columns += column + ", ";
//         }
//         console.log("%s\t", columns.substring(0, columns.length - 2));

//         // ouput row contents from default record set
//         resultSet.recordset.forEach(row => {
//             console.log("%d\t%s\t%s", row.PlantID, row.PlantName, row.Image);
//         });

//         // close connection only when we're certain application is finished
//         poolConnection.close();
//     } catch (err) {
//         console.error(err.message);
//     }
// }

async function connectAndQuery() {
    try {
        let poolConnection = await sql.connect(config);
        console.log("Reading rows from the Boxes table...");
        let resultSet = await poolConnection.request().query('SELECT * FROM [dbo].[box];');

        console.log(`${resultSet.recordset.length} rows returned.`);

        // 输出列名
        let columns = Object.keys(resultSet.recordset.columns).join(", ");
        console.log("Columns:\t", columns);

        // 输出行数据
        resultSet.recordset.forEach(row => {
            // 假设 BoxID, BoxName, BoxContent 是你 boxes 表的列名
            // 请根据实际情况进行修改
            console.log("%d\t%s\t%s", row.patient_id, row.patient_id, row.patient_id);
        });

        // 确定应用完成后关闭连接
        poolConnection.close();
    } catch (err) {
        console.error('Failed to query the Boxes table:', err.message);
    }
}
