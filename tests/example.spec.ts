import { test, expect } from '@playwright/test';
import {getScenarioExecutionStatus, loginData} from "./test-data/test-data-supplier";

test('excel test', async ({ page }) => {
    const scenarioId = 'sc001';
    const shouldExecute = await getScenarioExecutionStatus(scenarioId);
    console.log('shouldExecute:', shouldExecute);
    console.log(loginData[scenarioId].username);
    test.skip(!shouldExecute, `Skipping ${scenarioId} as execute is set to 'No'.`);
    // Implement test logic here
});
