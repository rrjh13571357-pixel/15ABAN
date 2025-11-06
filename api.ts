
import * as identityController from './controllers/identityController';
import * as organizationController from './controllers/organizationController';
import * as requestController from './controllers/requestController';
import * as workflowController from './controllers/workflowController';
import * as bankAccountController from './controllers/bankAccountController';
import * as accessController from './controllers/accessController';
import * as projectController from './controllers/projectController';
import * as financialResourceController from './controllers/financialResourceController';
import * as workMeasurementController from './controllers/workMeasurementController';
import * as contractController from './controllers/contractController';
import * as analysisController from './controllers/analysisController';
import * as notificationController from './controllers/notificationController';
import * as payrollController from './controllers/payrollController';
import * as reportController from './controllers/reportController';
import * as automationController from './controllers/automationController';

// A helper to simulate network delay for API calls
const simulateApiCall = <T>(data: T, delay: number = 500): Promise<T> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
};

const createApiController = <T extends Record<string, (...args: any[]) => any>>(controller: T): { [K in keyof T]: (...args: Parameters<T[K]>) => Promise<ReturnType<T[K]>> } => {
    return Object.keys(controller).reduce((acc, key) => {
        acc[key as keyof T] = (...args: Parameters<T[keyof T]>) => {
            try {
                const result = controller[key as keyof T](...args);
                return simulateApiCall(result);
            } catch (error) {
                return Promise.reject(error);
            }
        };
        return acc;
    }, {} as { [K in keyof T]: (...args: Parameters<T[K]>) => Promise<ReturnType<T[K]>> });
};

export const virtualApi = {
    identity: createApiController(identityController),
    organization: createApiController(organizationController),
    request: createApiController(requestController),
    workflow: createApiController(workflowController),
    bankAccount: createApiController(bankAccountController),
    access: createApiController(accessController),
    project: createApiController(projectController),
    financialResource: createApiController(financialResourceController),
    workMeasurement: createApiController(workMeasurementController),
    contract: createApiController(contractController),
    analysis: createApiController(analysisController),
    notification: createApiController(notificationController),
    payroll: createApiController(payrollController),
    report: createApiController(reportController),
    automation: createApiController(automationController),
};