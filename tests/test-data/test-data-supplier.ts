const ExcelJS = require('exceljs');

let workbookPath = 'test-data.xlsx';

type SheetConfig = {
    sheetName: string;
    columns: string[];
    data: { [key: string]: any };
};

const sheetConfigs: SheetConfig[] = [
    {
        sheetName: 'run-manager',
        columns: ['scenarioId', 'execute'],
        data: {}
    },
    {
        sheetName: 'login-data',
        columns: ['scenarioId', 'username', 'password'],
        data: {}
    },
    {
        sheetName: 'other-data',
        columns: ['scenarioId', 'data1', 'data2'], // Add more columns here
        data: {}
    }
    // Add more sheets here
];

const dataVariables: { [key: string]: { [key: string]: any } } = {};

sheetConfigs.forEach(config => {
    dataVariables[config.sheetName] = config.data;
});

export let runManagerData = dataVariables['run-manager'];
export let loginData = dataVariables['login-data'];
export let otherData = dataVariables['other-data'];

// export let anyOtherData = dataVariables['any-other-data']; in bracket give sheet name

export async function loadExcelData(): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(workbookPath);

    for (const config of sheetConfigs) {
        const worksheet = workbook.getWorksheet(config.sheetName);
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                const rowData: { [key: string]: string } = {};
                config.columns.forEach((col, index) => {
                    rowData[col] = row.getCell(index + 1).value?.toString() || '';
                });
                config.data[rowData[config.columns[0]]] = rowData;
            }
        });
    }
}

export async function getScenarioExecutionStatus(scenarioId: string): Promise<boolean> {
    return runManagerData[scenarioId]?.execute === 'yes';
}