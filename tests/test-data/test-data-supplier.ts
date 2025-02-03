const ExcelJS = require('exceljs');

let workbookPath = 'test-data.xlsx';

export type runManagerDataType = { [key: string]: string };
export type loginDataType = {
    username: string;
    password: string;
};
export type otherDataType = {
    data1: string;
    data2: string;
};

export let runManagerData: runManagerDataType = {};
export let loginData: { [key: string]: loginDataType } = {};
export let otherData: { [key: string]: otherDataType } = {};

export async function loadExcelData(): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(workbookPath);

    // Load run-manager data
    const runManagerSheet = workbook.getWorksheet('run-manager');
    runManagerSheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            const id = row.getCell(1).value?.toString();
            const execute = row.getCell(2).value?.toString();
            if (id && execute) {
                runManagerData[id] = execute;
            }
        }
    });

    // Load login-data
    const loginDataSheet = workbook.getWorksheet('login-data');
    loginDataSheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            const scenarioId = row.getCell(1).value?.toString();
            const username = row.getCell(2).value?.toString();
            const password = row.getCell(3).value?.toString();
            if (scenarioId && username && password) {
                loginData[scenarioId] = { username, password };
            }
        }
    });

    // Load other-data
    const otherDataSheet = workbook.getWorksheet('other-data');
    otherDataSheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            const scenarioId = row.getCell(1).value?.toString();
            const data1 = row.getCell(2).value?.toString();
            const data2 = row.getCell(3).value?.toString();
            if (scenarioId && data1 && data2) {
                otherData[scenarioId] = { data1, data2 };
            }
        }
    });
}

export async function getScenarioExecutionStatus(scenarioId: string): Promise<boolean> {
    return runManagerData[scenarioId] === 'yes';
}