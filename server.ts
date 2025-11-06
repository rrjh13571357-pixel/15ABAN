

import express from 'express';
import cors from 'cors';
// FIX: Corrected controller import paths to point to the correct `backend` directory controllers.
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

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const asyncHandler = (fn: (req: express.Request, res: express.Response) => any) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res)).catch(error => {
        console.error(`Error in ${req.method} ${req.path}:`, error);
        res.status(400).json({ message: error.message });
    });
};

// --- Routes ---

// Identity
app.post('/api/auth/login', asyncHandler(async (req, res) => res.json(identityController.login(req.body.username, req.body.password))));
app.get('/api/users', asyncHandler(async (req, res) => res.json(identityController.getSystemUsers())));
app.post('/api/users', asyncHandler(async (req, res) => res.status(201).json(identityController.addSystemUser(req.body))));
app.put('/api/users/:id', asyncHandler(async (req, res) => res.json(identityController.updateSystemUser({ ...req.body, id: Number(req.params.id) }))));
app.put('/api/users/:id/define', asyncHandler(async (req, res) => res.json(identityController.defineSystemUser(Number(req.params.id), req.body))));
app.delete('/api/users/:id', asyncHandler(async (req, res) => res.json(identityController.deleteSystemUser(Number(req.params.id)))));
app.get('/api/beneficiaries', asyncHandler(async (req, res) => res.json(identityController.getBeneficiaries())));
app.get('/api/petty-cash-holders', asyncHandler(async (req, res) => res.json(identityController.getPettyCashHolders())));
app.post('/api/petty-cash-holders/set-global-limit', asyncHandler(async (req, res) => res.json(identityController.updateAllPettyCashLimits(req.body.limit))));
app.get('/api/roles', asyncHandler(async (req, res) => res.json(identityController.getRoles())));

// Organization
app.get('/api/org-units', asyncHandler(async (req, res) => res.json(organizationController.getOrgUnits())));
app.delete('/api/org-units/:id', asyncHandler(async (req, res) => {
    res.json(await organizationController.deleteOrgUnit(req.params.id));
}));

// Requests
app.get('/api/requests', asyncHandler(async (req, res) => res.json(requestController.getRequests())));
app.get('/api/requests/:id', asyncHandler(async (req, res) => res.json(requestController.getRequestDetails(req.params.id))));
app.post('/api/requests', asyncHandler(async (req, res) => res.status(201).json(requestController.addRequest(req.body.requestData, req.body.invoicesData))));
app.delete('/api/requests/:id', asyncHandler(async (req, res) => res.json(requestController.deleteRequest(req.params.id))));
app.post('/api/requests/:id/approve', asyncHandler(async (req, res) => res.json(requestController.approveRequestStep(req.params.id))));
app.post('/api/requests/:id/reject', asyncHandler(async (req, res) => res.json(requestController.rejectRequest(req.params.id, req.body.reason))));
app.post('/api/requests/:id/consultations', asyncHandler(async (req, res) => res.json(requestController.askForConsultation(req.params.id, req.body.toUserIds, req.body.question))));
app.put('/api/requests/:id/resubmit', asyncHandler(async (req, res) => res.json(requestController.resubmitRequest(req.body.requestData, req.body.invoicesData))));
app.get('/api/consultations', asyncHandler(async (req, res) => res.json(requestController.getConsultations())));
app.post('/api/consultations/:id/answer', asyncHandler(async (req, res) => res.json(requestController.answerConsultation(Number(req.params.id), req.body.answer))));

// Other simple CRUDs
app.get('/api/bank-accounts', asyncHandler(async (req, res) => res.json(bankAccountController.getBankAccounts())));
app.get('/api/access-levels', asyncHandler(async (req, res) => res.json(accessController.getAccessLevels())));
app.get('/api/projects', asyncHandler(async (req, res) => res.json(projectController.getProjects())));
app.get('/api/financial-resources', asyncHandler(async (req, res) => res.json(financialResourceController.getFinancialResources())));
app.get('/api/tasks', asyncHandler(async (req, res) => res.json(workMeasurementController.getTasks())));
app.get('/api/request-types', asyncHandler(async (req, res) => res.json(workflowController.getRequestTypes())));
app.get('/api/workflows', asyncHandler(async (req, res) => res.json(workflowController.getWorkflows())));

// Contracts
app.get('/api/contracts', asyncHandler(async (req, res) => res.json(contractController.getContractList())));
app.get('/api/contracts/:id', asyncHandler(async (req, res) => res.json(contractController.getContractDetails(Number(req.params.id)))));
app.post('/api/contracts/:id/payments', asyncHandler(async (req, res) => res.json(contractController.addPayment({ ...req.body, contractId: Number(req.params.id) }))));
app.post('/api/contracts', asyncHandler(async (req, res) => res.status(201).json(await contractController.addContract(req.body))));


// Analysis
app.post('/api/analysis', asyncHandler(async (req, res) => res.json(analysisController.getAnalysis(req.body.question))));
app.get('/api/analysis/templates', asyncHandler(async (req, res) => res.json(analysisController.getTemplates())));

// Notifications
app.get('/api/notifications', asyncHandler(async (req, res) => res.json(notificationController.getNotifications())));
app.post('/api/notifications/:id/read', asyncHandler(async (req, res) => res.json(notificationController.markNotificationAsRead(Number(req.params.id)))));
app.post('/api/notifications/read-all', asyncHandler(async (req, res) => res.json(notificationController.markAllNotificationsAsRead())));

// Payroll
app.get('/api/payrolls', asyncHandler(async (req, res) => res.json(payrollController.getPayrolls())));
app.get('/api/payrolls/:id', asyncHandler(async (req, res) => res.json(payrollController.getPayrollDetails(Number(req.params.id)))));

// Reports
app.get('/api/reports/project-financial-summary', asyncHandler(async (req, res) => res.json(reportController.getProjectFinancialSummary())));
app.get('/api/reports/status-distribution', asyncHandler(async (req, res) => res.json(reportController.getStatusDistribution())));
app.get('/api/reports/monthly-request-volume', asyncHandler(async (req, res) => res.json(reportController.getMonthlyRequestVolume())));
app.get('/api/invoice-items/search', asyncHandler(async (req, res) => res.json(reportController.searchInvoiceItems(req.query))));

// Automation
app.get('/api/automation/inbox', asyncHandler(async (req, res) => res.json(automationController.getInboxLetters(6)))); // Hardcoded user 6 (admin)
app.get('/api/automation/letters/:id', asyncHandler(async (req, res) => res.json(automationController.getLetterDetails(Number(req.params.id), 6))));
app.post('/api/automation/letters', asyncHandler(async (req, res) => res.status(201).json(automationController.sendLetter(req.body))));
app.get('/api/automation/templates', asyncHandler(async (req, res) => res.json(automationController.getLetterTemplates())));
app.post('/api/automation/templates', asyncHandler(async (req, res) => res.status(201).json(automationController.addLetterTemplate(req.body))));
app.delete('/api/automation/templates/:id', asyncHandler(async (req, res) => res.json(automationController.deleteLetterTemplate(Number(req.params.id)))));


app.listen(PORT, () => {
    console.log(`✅ Mock server is running on http://localhost:${PORT}`);
});