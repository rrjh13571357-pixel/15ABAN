import type { SystemUser, Beneficiary, PettyCashHolder, Role, OrganizationalUnit, Request, Workflow, BankAccount, AccessLevel, Project, FinancialResource, Task, Contract, Payment, Guarantee, Addendum, Attachment, ContractDetails, Notification, Payroll, PayrollItem, Invoice, InvoiceItem, FundInjection, Letter, LetterTemplate, RequestType, Consultation, Rejection } from '../shared/types';
import { RequestStatus, TaskStatus, ContractStatus, PayrollStatus, LetterStatus, LetterPriority } from '../shared/types';

// Storage Keys
const SYSTEM_USERS_STORAGE_KEY = 'mockSystemUsers';
const BENEFICIARIES_STORAGE_KEY = 'mockBeneficiaries';
const PETTY_CASH_HOLDERS_STORAGE_KEY = 'mockPettyCashHolders';
const BANK_ACCOUNTS_STORAGE_KEY = 'mockBankAccounts';
const ACCESS_LEVELS_STORAGE_KEY = 'mockAccessLevels';
const PROJECTS_STORAGE_KEY = 'mockProjects';
const FINANCIAL_RESOURCES_STORAGE_KEY = 'mockFinancialResources';
const FUND_INJECTIONS_STORAGE_KEY = 'mockFundInjections';
const TASKS_STORAGE_KEY = 'mockTasks';
const CONTRACTS_STORAGE_KEY = 'mockContracts';
const PAYMENTS_STORAGE_KEY = 'mockPayments';
const GUARANTEES_STORAGE_KEY = 'mockGuarantees';
const ADDENDUMS_STORAGE_KEY = 'mockAddendums';
const ATTACHMENTS_STORAGE_KEY = 'mockAttachments';
const NOTIFICATIONS_STORAGE_KEY = 'mockNotifications';
const PAYROLLS_STORAGE_KEY = 'mockPayrolls';
const PAYROLL_ITEMS_STORAGE_KEY = 'mockPayrollItems';
const INVOICES_STORAGE_KEY = 'mockInvoices';
const INVOICE_ITEMS_STORAGE_KEY = 'mockInvoiceItems';
const LETTERS_STORAGE_KEY = 'mockLetters';
const LETTER_TEMPLATES_STORAGE_KEY = 'mockLetterTemplates';
const CONSULTATIONS_STORAGE_KEY = 'mockConsultations';
const REJECTIONS_STORAGE_KEY = 'mockRejections';


const ROLES_STORAGE_KEY = 'mockRoles';
const ORG_UNITS_STORAGE_KEY = 'mockOrgUnits';
const REQUESTS_STORAGE_KEY = 'mockRequests';
const WORKFLOWS_STORAGE_KEY = 'mockWorkflows';
const REQUEST_COUNTERS_STORAGE_KEY = 'mockRequestCounters';
const REQUEST_TYPES_STORAGE_KEY = 'mockRequestTypes';


// --- Initial Data ---
const initialSystemUsers: SystemUser[] = [
    {id: 1, fullName: 'علی احمدی', nationalCode: '1234567890', unitId: '2', roleId: 1, username: 'ali.ahmadi', password: 'password', status: 'active', forcePasswordChange: false, passwordNeverExpires: false },
    {id: 6, fullName: 'مدیر سیستم', nationalCode: '1010101010', unitId: '4', roleId: 4, username: 'admin', password: 'password', status: 'active', forcePasswordChange: false, passwordNeverExpires: true },
    {id: 7, fullName: 'سارا احمدی', nationalCode: '111222333', unitId: '1', roleId: 2, username: 'sara.ahmadi', password: 'password', status: 'active', forcePasswordChange: false, passwordNeverExpires: false },
    {id: 8, fullName: 'علی رضایی', nationalCode: '444555666', unitId: '2', roleId: 1, username: 'ali.rezaei', password: 'password', status: 'active', forcePasswordChange: false, passwordNeverExpires: false },
    {id: 9, fullName: 'مریم حسینی', nationalCode: '777888999', unitId: '3', roleId: 1, username: 'maryam.hosseini', password: 'password', status: 'active', forcePasswordChange: false, passwordNeverExpires: false },
    {id: 10, fullName: 'رضا قاسمی', nationalCode: '121212121', unitId: '4', roleId: 1, username: 'reza.ghasemi', password: 'password', status: 'active', forcePasswordChange: false, passwordNeverExpires: false },
    {id: 4, fullName: 'روح الله جهان پناه', nationalCode: '5566778899', unitId: '1', roleId: 1, username: 'roohollah.j', password: 'password', status: 'active', forcePasswordChange: false, passwordNeverExpires: false },
    {id: 5, fullName: 'محسن سعادتی', nationalCode: '0000000000', unitId: '2', roleId: 1, username: 'mohsen.s', password: 'password', status: 'active', forcePasswordChange: false, passwordNeverExpires: false },
];

const initialBeneficiaries: Beneficiary[] = [
    {id: 2, fullName: 'شرکت داده‌پردازان نوین', nationalCode: '0987654321'},
    {id: 3, fullName: 'کیومرث حسن پور (پیمانکار)', nationalCode: '1122334455'},
    {id: 11, fullName: 'علی اصغری نژاد', nationalCode: '223344556'},
    {id: 12, fullName: 'آقای محمدی', nationalCode: '778899001'},
    {id: 13, fullName: 'هیدروفن کوانتومی', nationalCode: '555666777'},
];

const initialPettyCashHolders: PettyCashHolder[] = [
    {id: 4, fullName: 'روح الله جهان پناه', nationalCode: '5566778899', associatedCenterId: '1', pettyCashLimit: 50000000},
    {id: 5, fullName: 'محسن سعادتی', nationalCode: '0000000000', associatedCenterId: '2', pettyCashLimit: 75000000},
];

const initialBankAccounts: BankAccount[] = [
    {id: 1, bankName: 'ملت', accountNumber: '123-456-789', iban: '210120000000001234567890', ownerId: 2, ownerType: 'beneficiary'},
    {id: 2, bankName: 'صادرات', accountNumber: '987-654-321', iban: '110190000000009876543210', ownerId: 4, ownerType: 'pettyCash'},
    {id: 3, bankName: 'ملی', accountNumber: '111-222-333', iban: '150170000000101112223330', ownerId: 3, ownerType: 'beneficiary'},
];

const initialRoles: Role[] = [
    { id: 1, title: 'کارمند', description: 'نقش پیش فرض برای کاربران', userCount: 1, status: 'فعال' },
    { id: 2, title: 'مدیر واحد', description: 'اداری', userCount: 0, status: 'فعال' },
    { id: 3, title: 'پیمانکار', description: '-', userCount: 0, status: 'فعال' },
    { id: 4, title: 'مدیر سیستم', description: 'این نقش بالاترین سطح دسترسی را در کل سیستم دارد.', userCount: 1, status: 'فعال' },
];

const initialAccessLevels: AccessLevel[] = [
    { 
        id: 1, 
        title: 'دسترسی کامل مدیریتی', 
        description: 'دسترسی به تمام بخش‌های سیستم', 
        roleIds: [4], // مدیر سیستم
        permissions: [ // All permissions
            'dashboard:view',
            'requests:create', 'requests:view:all', 'requests:delete', 'requests:approve',
            'projects:view', 'projects:create', 'projects:edit', 'projects:delete', 'projects:manage_funds',
            'contracts:view', 'contracts:create', 'contracts:edit', 'contracts:delete', 'contracts:manage_payments',
            'payroll:view', 'payroll:create', 'payroll:finalize',
            'reports:view:dashboard', 'reports:view:invoice_explorer',
            'automation:view:inbox', 'automation:send', 'automation:manage_templates',
            'baseinfo:manage:org_structure', 'baseinfo:manage:persons', 'baseinfo:manage:bank_accounts', 'baseinfo:manage:financial_resources',
            'system:manage:users', 'system:manage:roles', 'system:manage:access_levels', 'system:manage:workflows',
            'ai:use'
        ]
    },
    { 
        id: 2, 
        title: 'دسترسی کارمندان مالی', 
        description: 'دسترسی به ثبت و مشاهده درخواست‌ها', 
        roleIds: [1, 2], // کارمند, مدیر واحد
        permissions: [
            'dashboard:view',
            'requests:create',
            'requests:view:own',
            'projects:view',
            'contracts:view',
            'payroll:view',
        ]
    },
];

const initialFinancialResources: FinancialResource[] = [
    { id: 1, name: 'منابع جاری' },
    { id: 2, name: 'منابع عمرانی' },
    { id: 3, name: 'سایر منابع' },
];

const initialProjects: Project[] = [
    { id: 1, name: 'پروژه آلفا', orgUnitId: '2', startDate: '1401/10/25', financialResourceId: 1, budget: { rial: 1000000000, usd: 5000, eur: 0 }, spentAmount: { rial: 450000000, usd: 1200, eur: 0 } },
    { id: 2, name: 'پروژه بتا', orgUnitId: '2', startDate: '1402/02/30', financialResourceId: 1, budget: { rial: 500000000, usd: 0, eur: 0 }, spentAmount: { rial: 100000000, usd: 0, eur: 0 } },
    { id: 3, name: 'پروژه گاما', orgUnitId: '3', startDate: '1401/08/10', financialResourceId: 2, budget: { rial: 2500000000, usd: 10000, eur: 15000 }, spentAmount: { rial: 2600000000, usd: 10500, eur: 14000 } }, // Over budget
    { id: 4, name: 'پروژه توسعه زیرساخت', orgUnitId: '4', startDate: '1402/10/11', financialResourceId: 2, budget: { rial: 5000000000, usd: 0, eur: 50000 }, spentAmount: { rial: 1200000000, usd: 0, eur: 10000 } },
];

const initialFundInjections: FundInjection[] = [];

const initialOrgUnits: OrganizationalUnit[] = [
    { id: '1', title: 'مدیریت مالی', code: '100', managerId: 7, parent: null },
    { id: '2', title: 'حسابداری', code: '101', managerId: 8, parent: 'مدیریت مالی' },
    { id: '3', title: 'خزانه', code: '102', managerId: 9, parent: 'مدیریت مالی' },
    { id: '4', title: 'فناوری اطلاعات', code: '200', managerId: 6, parent: null },
];

export const initialRequests: Request[] = [
  { id: 'SR-176121541238', subject: 'ارسال هزینه تنخواه', applicant: 'روح الله جهان پناه', amount: { rial: 200, usd: 0, eur: 0 }, date: '1403/04/30', deadline: null, status: RequestStatus.Rejected, originalApplicantId: 4, currentStepOwnerId: 4, lastModified: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), requestTypeId: 2, workflowId: 2 },
  { id: 'SR-176121588086', subject: 'ارسال هزینه تنخواه', applicant: 'روح الله جهان پناه', amount: { rial: 2028, usd: 0, eur: 0 }, date: '1403/04/30', deadline: null, status: RequestStatus.Pending, originalApplicantId: 4, currentStepOwnerId: 7, lastModified: new Date(Date.now() - 1000 * 60 * 10).toISOString(), requestTypeId: 2, workflowId: 2 },
  { id: 'SR-1768773879181', subject: 'خرید مستقیم', applicant: 'مدیر سیستم', amount: { rial: 82000, usd: 0, eur: 0 }, date: '1403/04/30', deadline: null, status: RequestStatus.InProgress, originalApplicantId: 6, currentStepOwnerId: 6, lastModified: new Date().toISOString(), requestTypeId: 3, workflowId: 3 },
  { id: 'SR-1761868196150', subject: 'تامین تنخواه گردان', applicant: 'محسن سعادتی', amount: { rial: 81222, usd: 0, eur: 0 }, date: '1403/04/27', deadline: null, status: RequestStatus.Completed, originalApplicantId: 5, currentStepOwnerId: 8, lastModified: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), requestTypeId: 4, workflowId: 1 },
  { id: 'SR-176982711847', subject: 'خرید', applicant: 'مدیر سیستم', amount: { rial: 122222222, usd: 0, eur: 0 }, date: '1401/07/27', deadline: '1401/07/27', status: RequestStatus.InProgress, originalApplicantId: 6, currentStepOwnerId: 6, lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), requestTypeId: 3, workflowId: 3 },
  { id: 'SR-1770000000001', subject: 'تامین پیش پرداخت قرارداد', applicant: 'مدیر سیستم', amount: { rial: 15300000, usd: 0, eur: 0 }, date: '1404/08/01', deadline: null, status: RequestStatus.Pending, projectId: 1, contractId: 1, originalApplicantId: 6, currentStepOwnerId: 7, lastModified: new Date(Date.now() - 1000 * 60 * 30).toISOString(), requestTypeId: 1, workflowId: 5 },
];

const initialWorkflows: Workflow[] = [
    { id: 1, name: 'PettyCashWorkflow', steps: [{name: 'مرحله مدیریتی', responsible: 'مدیر واحد'}, {name: 'مرحله بعدی', responsible: 'حسابداری'}], icon: 'P', requirements: [] },
    { id: 2, name: 'ارسال هزینه تنخواه - گردش پیش فرض', steps: [{name: 'مرحله اولیه', responsible: 'درخواست کننده'}, {name: 'تایید مدیریتی', responsible: 'مدیر مافوق'}, {name: 'بررسی مدیر', responsible: 'مدیر واحد'}, {name: 'تصویب', responsible: 'مسئول واحد در عملیات'}], icon: 'A', requirements: [] },
    { id: 3, name: 'خرید مستقیم', steps: [{name: 'ثبت اولیه', responsible: 'مدیر سیستم'}, {name: 'تایید', responsible: 'مدیر'}, {name: 'بررسی', responsible: 'مدیر مالی'}, {name: 'تایید مدیر عامل', responsible: 'مدیر عامل'}], icon: 'K', requirements: [] },
    { id: 4, name: 'PettyCash WF', steps: [{name: 'Step 1', responsible: 'کاربر'}, {name: 'تایید', responsible: 'مسئول واحد'}, {name: 'تایید مدیر عامل', responsible: 'مدیر عامل'}], icon: 'P', requirements: [] },
    { id: 5, name: 'فرایند قرارداد خرید', steps: [{ name: 'ثبت اولیه', responsible: 'ALL_USERS' }, { name: 'بررسی درخواست', responsible: 'PERSON:7' }, { name: 'تایید نهایی', responsible: 'مدیر واحد' }], icon: 'B', requirements: ['ثبت درخواست تامین', 'پیش پرداخت قرارداد خرید'] }
];

const initialRequestTypes: RequestType[] = [
    { id: 1, title: 'تامین پیش پرداخت قرارداد', deadline: null, attachedFileRequired: false, workflowId: 5 },
    { id: 2, title: 'ارسال هزینه تنخواه', deadline: null, attachedFileRequired: true, workflowId: 2 },
    { id: 3, title: 'خرید', deadline: 7, attachedFileRequired: true, workflowId: 3 },
    { id: 4, title: 'تامین تنخواه گردان', deadline: 10, attachedFileRequired: false, workflowId: 1 },
    { id: 5, title: 'دیون', deadline: null, attachedFileRequired: false, workflowId: 1 },
];

const initialTasks: Task[] = [
    { id: 1, title: 'تهیه گزارش ماهانه فروش', responsible: 'سارا احمدی', status: TaskStatus.Completed, progress: 100, lastUpdate: '1403/04/18', deadline: null },
    { id: 2, title: 'بررسی و تطبیق حساب‌های بانکی', responsible: 'علی رضایی', status: TaskStatus.InProgress, progress: 50, lastUpdate: '1403/04/22', deadline: '1403/05/10' },
    { id: 3, title: 'آماده‌سازی لیست حقوق و دستمزد تیر ماه', responsible: 'سارا احمدی', status: TaskStatus.InProgress, progress: 100, lastUpdate: '1403/04/22', deadline: '1403/05/02' },
    { id: 4, title: 'پیگیری مطالبات معوق از مشتریان', responsible: 'مریم حسینی', status: TaskStatus.NotStarted, progress: 22, lastUpdate: '1403/04/19', deadline: '1403/04/28' },
    { id: 5, title: 'ثبت اسناد حسابداری خرید', responsible: 'رضا قاسمی', status: TaskStatus.Blocked, progress: 10, lastUpdate: '1403/04/19', deadline: '1403/04/20' },
    { id: 6, title: 'تهیه اظهارنامه مالیات بر ارزش افزوده فصل بهار', responsible: 'علی رضایی', status: TaskStatus.Completed, progress: 100, lastUpdate: '1403/04/18', deadline: null },
];

const initialContracts: ContractDetails[] = [
    { id: 1, contractNumber: '1403-04-0001', title: 'دستگاه فیلامنت کامپیوتری', party: 'هیدروفن کوانتومی', amount: 102000000, endDate: '1404/02/17', status: ContractStatus.Pending, manualContractNumber: '---', employer: 'شرکت ما (واحد داخلی)', ourRole: 'payer', contractType: 'خرید', category: 'خدمات', projectType: 'پروژه‌ای', relatedCenter: 'فناوری', startDate: '1403/02/17', guarantees: [], payments: [], addendums: [], attachments: [] },
    { id: 2, contractNumber: '1403-01-0001', title: 'هیدروفن کوانتومی', party: 'علی اصغری نژاد', amount: 60000000, endDate: '1404/01/10', status: ContractStatus.Pending, manualContractNumber: '---', employer: 'شرکت ما (واحد داخلی)', ourRole: 'payer', contractType: 'خرید', category: 'خدمات', projectType: 'پروژه‌ای', relatedCenter: 'فناوری', startDate: '1403/01/10', guarantees: [], payments: [], addendums: [], attachments: [] },
    { id: 3, contractNumber: '1403-05-0001', title: 'مشاوره و تحلیل سیستم', party: 'آقای محمدی', amount: null, endDate: '1404/11/13', status: ContractStatus.Active, manualContractNumber: '---', employer: 'شرکت ما (واحد داخلی)', ourRole: 'payer', contractType: 'خرید', category: 'خدمات', projectType: 'پروژه‌ای', relatedCenter: 'فناوری', startDate: '1403/11/13', guarantees: [], payments: [], addendums: [], attachments: [] },
];

const initialPayments: Payment[] = [];
const initialGuarantees: Guarantee[] = [];
const initialAddendums: Addendum[] = [];
const initialAttachments: Attachment[] = [];
const initialNotifications: Notification[] = [
    { id: 1, type: 'request', title: 'درخواست جدید', description: 'درخواست "خرید مستقیم" با شماره SR-1768773879181 ثبت شد.', timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(), isRead: false, link: 'DASHBOARD' },
    { id: 2, type: 'contract', title: 'قرارداد تایید شد', description: 'قرارداد "هیدروفن کوانتومی" به وضعیت فعال تغییر یافت.', timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), isRead: false, link: 'CONTRACTS' },
    { id: 3, type: 'system', title: 'بروزرسانی سیستم', description: 'سیستم به نسخه 2.1 بروزرسانی شد. ماژول کارسنجی اضافه گردید.', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), isRead: false, link: 'WORK_MEASUREMENT' },
    { id: 4, type: 'request', title: 'درخواست رد شد', description: 'درخواست تنخواه با شماره SR-176121541238 رد شد.', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), isRead: true },
    { id: 5, type: 'contract', title: 'قرارداد در انتظار', description: 'قرارداد "دستگاه فیلامنت" منتظر بررسی شماست.', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), isRead: true },
    { id: 6, type: 'consultation', title: 'نظرخواهی جدید', description: 'آقای احمدی در مورد درخواست SR-1768773879181 از شما نظرخواهی کرده است.', timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), isRead: false, link: 'DASHBOARD', requestId: 'SR-1768773879181' },

];
const initialPayrolls: Payroll[] = [
    { id: 1, period: "خرداد 1403", employeeCount: 5, totalAmount: { rial: 980000000, usd: 0, eur: 0 }, status: PayrollStatus.Paid, paymentDate: "1403/04/05" },
    { id: 2, period: "تیر 1403", employeeCount: 5, totalAmount: { rial: 985000000, usd: 0, eur: 0 }, status: PayrollStatus.Draft, paymentDate: null },
];

const initialPayrollItems: PayrollItem[] = [
    { id: 1, payrollId: 1, employeeId: 1, baseSalary: 180000000, overtime: 15000000, bonus: 5000000, deductions: 20000000, netPay: 180000000 },
    { id: 2, payrollId: 1, employeeId: 7, baseSalary: 250000000, overtime: 0, bonus: 10000000, deductions: 30000000, netPay: 230000000 },
    { id: 3, payrollId: 1, employeeId: 8, baseSalary: 180000000, overtime: 20000000, bonus: 0, deductions: 20000000, netPay: 180000000 },
    { id: 4, payrollId: 1, employeeId: 9, baseSalary: 180000000, overtime: 10000000, bonus: 0, deductions: 20000000, netPay: 170000000 },
    { id: 5, payrollId: 1, employeeId: 10, baseSalary: 200000000, overtime: 20000000, bonus: 20000000, deductions: 20000000, netPay: 220000000 },
    { id: 6, payrollId: 2, employeeId: 1, baseSalary: 180000000, overtime: 18000000, bonus: 5000000, deductions: 20000000, netPay: 183000000 },
    { id: 7, payrollId: 2, employeeId: 7, baseSalary: 250000000, overtime: 0, bonus: 10000000, deductions: 30000000, netPay: 230000000 },
    { id: 8, payrollId: 2, employeeId: 8, baseSalary: 180000000, overtime: 22000000, bonus: 0, deductions: 20000000, netPay: 182000000 },
    { id: 9, payrollId: 2, employeeId: 9, baseSalary: 180000000, overtime: 10000000, bonus: 0, deductions: 20000000, netPay: 170000000 },
    { id: 10, payrollId: 2, employeeId: 10, baseSalary: 200000000, overtime: 20000000, bonus: 20000000, deductions: 20000000, netPay: 220000000 },
];

const initialInvoices: Invoice[] = [
    { id: 1, requestId: 'SR-176121541238', invoiceNumber: 'F-9876', beneficiaryId: 2 },
    { id: 2, requestId: 'SR-176121588086', invoiceNumber: 'F-9877', beneficiaryId: 2 },
    { id: 3, requestId: 'SR-1768773879181', invoiceNumber: 'F-9878', beneficiaryId: 2 },
    { id: 4, requestId: 'SR-1761868196150', invoiceNumber: 'F-1122', beneficiaryId: 3 },
    { id: 5, requestId: 'SR-176982711847', invoiceNumber: 'F-3344', beneficiaryId: 11 },
];

const initialInvoiceItems: InvoiceItem[] = [
    { id: 1, invoiceId: 1, description: 'هارد دیسک SSD 1TB', quantity: 1, unitPrice: 200, costType: 'سرمایه‌ای' },
    { id: 2, invoiceId: 2, description: 'سرور HP Proliant DL380', quantity: 1, unitPrice: 2028, costType: 'سرمایه‌ای' },
    { id: 3, invoiceId: 3, description: 'سوییچ شبکه Cisco 24-port', quantity: 1, unitPrice: 82000, costType: 'سرمایه‌ای' },
    { id: 4, invoiceId: 4, description: 'هزینه ایاب و ذهاب', quantity: 1, unitPrice: 81222, costType: 'جاری' },
    { id: 5, invoiceId: 5, description: 'صندلی اداری', quantity: 10, unitPrice: 100000, costType: 'سرمایه‌ای' },
];

const initialRequestCounters: Record<string, number> = {};

const initialLetters: Letter[] = [
    { 
        id: 1, 
        subject: 'گزارش عملکرد ماهانه - تیر ۱۴۰۳', 
        content: 'به پیوست گزارش عملکرد ماهانه واحد مالی جهت استحضار ارسال می‌گردد.', 
        senderId: 7, 
        recipientIds: [6], 
        sentDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), 
        priority: LetterPriority.Normal, 
        status: { 6: LetterStatus.Unread },
        letterDate: '1403/05/01',
        senderUnitId: '1',
        recipientUnitId: '4',
        signatoryId: 7,
        attachments: [
            { id: 1, fileName: 'report.pdf', fileContent: 'dummy-base64-pdf', mimeType: 'application/pdf' }
        ]
    },
    { 
        id: 2, 
        subject: 'درخواست فوری: نیاز به مجوز خرید سرور', 
        content: 'با توجه به مشکلات پیش آمده در سرور فعلی، خواهشمند است مجوز خرید یک دستگاه سرور جدید را صادر فرمایید.', 
        senderId: 10, 
        recipientIds: [6, 7], 
        sentDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), 
        priority: LetterPriority.Urgent, 
        status: { 6: LetterStatus.Unread, 7: LetterStatus.Read },
        letterDate: '1403/04/30',
        senderUnitId: '4',
        recipientUnitId: '1',
        signatoryId: 10,
        attachments: []
    },
];

const initialLetterTemplates: LetterTemplate[] = [
    { id: 1, name: 'نامه رسمی اداری', fileName: 'official-template.docx', templateBody: 'UEsDBBQAAAAIA...' }, // Dummy base64
    { id: 2, name: 'نامه درخواست مرخصی', fileName: 'leave-request.docx', templateBody: 'UEsDBBQAAAAIB...' },
];

const initialConsultations: Consultation[] = [];
const initialRejections: (Rejection & { requestId: string })[] = [
    { requestId: 'SR-176121541238', stepName: 'تایید اولیه', rejectedBy: 'سارا احمدی', reason: 'مبلغ تنخواه بیش از حد مجاز است.', date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }
];

// --- In-Memory Store for Node.js environment ---
const inMemoryStore: { [key: string]: any } = {};
let isInitialized = false;

// If DATABASE_URL is present, we'll persist the in-memory store into Postgres
// using a simple kv_store table (key TEXT PRIMARY KEY, value JSONB).
let pgPool: any = null;
const hasRealDb = !!process.env.DATABASE_URL;

const initializeAllDbs = () => {
    if (isInitialized) return;

    // Use a function to deep-clone initial data to avoid mutation issues
    const clone = (data: any) => JSON.parse(JSON.stringify(data));

    // Fill in-memory with initial data
    inMemoryStore[SYSTEM_USERS_STORAGE_KEY] = clone(initialSystemUsers);
    inMemoryStore[BENEFICIARIES_STORAGE_KEY] = clone(initialBeneficiaries);
    inMemoryStore[PETTY_CASH_HOLDERS_STORAGE_KEY] = clone(initialPettyCashHolders);
    inMemoryStore[BANK_ACCOUNTS_STORAGE_KEY] = clone(initialBankAccounts);
    inMemoryStore[ACCESS_LEVELS_STORAGE_KEY] = clone(initialAccessLevels);
    inMemoryStore[PROJECTS_STORAGE_KEY] = clone(initialProjects);
    inMemoryStore[FINANCIAL_RESOURCES_STORAGE_KEY] = clone(initialFinancialResources);
    inMemoryStore[FUND_INJECTIONS_STORAGE_KEY] = clone(initialFundInjections);
    inMemoryStore[TASKS_STORAGE_KEY] = clone(initialTasks);
    inMemoryStore[CONTRACTS_STORAGE_KEY] = clone(initialContracts);
    inMemoryStore[PAYMENTS_STORAGE_KEY] = clone(initialPayments);
    inMemoryStore[GUARANTEES_STORAGE_KEY] = clone(initialGuarantees);
    inMemoryStore[ADDENDUMS_STORAGE_KEY] = clone(initialAddendums);
    inMemoryStore[ATTACHMENTS_STORAGE_KEY] = clone(initialAttachments);
    inMemoryStore[NOTIFICATIONS_STORAGE_KEY] = clone(initialNotifications);
    inMemoryStore[PAYROLLS_STORAGE_KEY] = clone(initialPayrolls);
    inMemoryStore[PAYROLL_ITEMS_STORAGE_KEY] = clone(initialPayrollItems);
    inMemoryStore[INVOICES_STORAGE_KEY] = clone(initialInvoices);
    inMemoryStore[INVOICE_ITEMS_STORAGE_KEY] = clone(initialInvoiceItems);
    inMemoryStore[LETTERS_STORAGE_KEY] = clone(initialLetters);
    inMemoryStore[LETTER_TEMPLATES_STORAGE_KEY] = clone(initialLetterTemplates);
    inMemoryStore[CONSULTATIONS_STORAGE_KEY] = clone(initialConsultations);
    inMemoryStore[REJECTIONS_STORAGE_KEY] = clone(initialRejections);
    inMemoryStore[ROLES_STORAGE_KEY] = clone(initialRoles);
    inMemoryStore[ORG_UNITS_STORAGE_KEY] = clone(initialOrgUnits);
    inMemoryStore[REQUESTS_STORAGE_KEY] = clone(initialRequests);
    inMemoryStore[WORKFLOWS_STORAGE_KEY] = clone(initialWorkflows);
    inMemoryStore[REQUEST_COUNTERS_STORAGE_KEY] = clone(initialRequestCounters);
    inMemoryStore[REQUEST_TYPES_STORAGE_KEY] = clone(initialRequestTypes);

    // If a real Postgres DB is configured, load stored values to override the defaults
    if (hasRealDb) {
        try {
            // Lazy require to avoid requiring pg when not needed
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { Pool } = require('pg');
            pgPool = new Pool({ connectionString: process.env.DATABASE_URL });

            // Create kv_store table if not exists
            pgPool.query(`CREATE TABLE IF NOT EXISTS kv_store (key TEXT PRIMARY KEY, value JSONB)`)
                .then(() => pgPool.query('SELECT key, value FROM kv_store'))
                .then((res: any) => {
                    if (res && res.rows) {
                        for (const row of res.rows) {
                            inMemoryStore[row.key] = row.value;
                        }
                    }

                    // Ensure all initial keys exist in DB
                    const upserts = [] as Array<Promise<any>>;
                    const keys = [
                        SYSTEM_USERS_STORAGE_KEY, BENEFICIARIES_STORAGE_KEY, PETTY_CASH_HOLDERS_STORAGE_KEY,
                        BANK_ACCOUNTS_STORAGE_KEY, ACCESS_LEVELS_STORAGE_KEY, PROJECTS_STORAGE_KEY,
                        FINANCIAL_RESOURCES_STORAGE_KEY, FUND_INJECTIONS_STORAGE_KEY, TASKS_STORAGE_KEY,
                        CONTRACTS_STORAGE_KEY, PAYMENTS_STORAGE_KEY, GUARANTEES_STORAGE_KEY,
                        ADDENDUMS_STORAGE_KEY, ATTACHMENTS_STORAGE_KEY, NOTIFICATIONS_STORAGE_KEY,
                        PAYROLLS_STORAGE_KEY, PAYROLL_ITEMS_STORAGE_KEY, INVOICES_STORAGE_KEY,
                        INVOICE_ITEMS_STORAGE_KEY, LETTERS_STORAGE_KEY, LETTER_TEMPLATES_STORAGE_KEY,
                        CONSULTATIONS_STORAGE_KEY, REJECTIONS_STORAGE_KEY, ROLES_STORAGE_KEY,
                        ORG_UNITS_STORAGE_KEY, REQUESTS_STORAGE_KEY, WORKFLOWS_STORAGE_KEY,
                        REQUEST_COUNTERS_STORAGE_KEY, REQUEST_TYPES_STORAGE_KEY
                    ];

                    for (const k of keys) {
                        const val = inMemoryStore[k];
                        upserts.push(pgPool.query(`INSERT INTO kv_store(key, value) VALUES($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`, [k, val]));
                    }

                    return Promise.all(upserts);
                })
                .then(() => console.log('[Real DB] kv_store initialized and synced to in-memory store.'))
                .catch((err: any) => {
                    console.error('[Real DB] Error initializing kv_store:', err);
                });
        } catch (err) {
            console.error('[Real DB] pg module not available or error initialising pool:', err);
            pgPool = null;
        }
    } else {
        console.log('[Mock DB] In-memory store initialized.');
    }

    isInitialized = true;
};


// --- Generic DB Handler (now in-memory) ---
const getFromDb = <T>(key: string, initialData: T): T => {
    // Ensure initialization happens once
    initializeAllDbs();
    
    if (inMemoryStore[key] !== undefined) {
        return inMemoryStore[key] as T;
    }
    
    // Fallback if a key wasn't in the initialization function
    inMemoryStore[key] = initialData;
    return initialData;
};

const saveToDb = <T>(key: string, data: T) => {
    // Ensure initialization happens once
    initializeAllDbs();
    inMemoryStore[key] = data;

    // Persist asynchronously to real DB if configured
    if (pgPool) {
        pgPool.query(`INSERT INTO kv_store(key, value) VALUES($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`, [key, data])
            .catch((err: any) => console.error('[Real DB] Failed to persist key', key, err));
    }
};


// --- Exported DB Accessors ---
export const db = {
    systemUsers: {
        get: () => getFromDb<SystemUser[]>(SYSTEM_USERS_STORAGE_KEY, initialSystemUsers),
        set: (data: SystemUser[]) => saveToDb(SYSTEM_USERS_STORAGE_KEY, data),
    },
    beneficiaries: {
        get: () => getFromDb<Beneficiary[]>(BENEFICIARIES_STORAGE_KEY, initialBeneficiaries),
        set: (data: Beneficiary[]) => saveToDb(BENEFICIARIES_STORAGE_KEY, data),
    },
    pettyCashHolders: {
        get: () => getFromDb<PettyCashHolder[]>(PETTY_CASH_HOLDERS_STORAGE_KEY, initialPettyCashHolders),
        set: (data: PettyCashHolder[]) => saveToDb(PETTY_CASH_HOLDERS_STORAGE_KEY, data),
    },
    bankAccounts: {
        get: () => getFromDb<BankAccount[]>(BANK_ACCOUNTS_STORAGE_KEY, initialBankAccounts),
        set: (data: BankAccount[]) => saveToDb(BANK_ACCOUNTS_STORAGE_KEY, data),
    },
    accessLevels: {
        get: () => getFromDb<AccessLevel[]>(ACCESS_LEVELS_STORAGE_KEY, initialAccessLevels),
        set: (data: AccessLevel[]) => saveToDb(ACCESS_LEVELS_STORAGE_KEY, data),
    },
    projects: {
        get: () => getFromDb<Project[]>(PROJECTS_STORAGE_KEY, initialProjects),
        set: (data: Project[]) => saveToDb(PROJECTS_STORAGE_KEY, data),
    },
    financialResources: {
        get: () => getFromDb<FinancialResource[]>(FINANCIAL_RESOURCES_STORAGE_KEY, initialFinancialResources),
        set: (data: FinancialResource[]) => saveToDb(FINANCIAL_RESOURCES_STORAGE_KEY, data),
    },
    fundInjections: {
        get: () => getFromDb<FundInjection[]>(FUND_INJECTIONS_STORAGE_KEY, initialFundInjections),
        set: (data: FundInjection[]) => saveToDb(FUND_INJECTIONS_STORAGE_KEY, data),
    },
    tasks: {
        get: () => getFromDb<Task[]>(TASKS_STORAGE_KEY, initialTasks),
        set: (data: Task[]) => saveToDb(TASKS_STORAGE_KEY, data),
    },
    contracts: {
        get: () => getFromDb<ContractDetails[]>(CONTRACTS_STORAGE_KEY, initialContracts),
        set: (data: ContractDetails[]) => saveToDb(CONTRACTS_STORAGE_KEY, data),
    },
     payments: {
        get: () => getFromDb<Payment[]>(PAYMENTS_STORAGE_KEY, initialPayments),
        set: (data: Payment[]) => saveToDb(PAYMENTS_STORAGE_KEY, data),
    },
    guarantees: {
        get: () => getFromDb<Guarantee[]>(GUARANTEES_STORAGE_KEY, initialGuarantees),
        set: (data: Guarantee[]) => saveToDb(GUARANTEES_STORAGE_KEY, data),
    },
    addendums: {
        get: () => getFromDb<Addendum[]>(ADDENDUMS_STORAGE_KEY, initialAddendums),
        set: (data: Addendum[]) => saveToDb(ADDENDUMS_STORAGE_KEY, data),
    },
    attachments: {
        get: () => getFromDb<Attachment[]>(ATTACHMENTS_STORAGE_KEY, initialAttachments),
        set: (data: Attachment[]) => saveToDb(ATTACHMENTS_STORAGE_KEY, data),
    },
    notifications: {
        get: () => getFromDb<Notification[]>(NOTIFICATIONS_STORAGE_KEY, initialNotifications),
        set: (data: Notification[]) => saveToDb(NOTIFICATIONS_STORAGE_KEY, data),
    },
    payrolls: {
        get: () => getFromDb<Payroll[]>(PAYROLLS_STORAGE_KEY, initialPayrolls),
        set: (data: Payroll[]) => saveToDb(PAYROLLS_STORAGE_KEY, data),
    },
    payrollItems: {
        get: () => getFromDb<PayrollItem[]>(PAYROLL_ITEMS_STORAGE_KEY, initialPayrollItems),
        set: (data: PayrollItem[]) => saveToDb(PAYROLL_ITEMS_STORAGE_KEY, data),
    },
    invoices: {
        get: () => getFromDb<Invoice[]>(INVOICES_STORAGE_KEY, initialInvoices),
        set: (data: Invoice[]) => saveToDb(INVOICES_STORAGE_KEY, data),
    },
    invoiceItems: {
        get: () => getFromDb<InvoiceItem[]>(INVOICE_ITEMS_STORAGE_KEY, initialInvoiceItems),
        set: (data: InvoiceItem[]) => saveToDb(INVOICE_ITEMS_STORAGE_KEY, data),
    },
     letters: {
        get: () => getFromDb<Letter[]>(LETTERS_STORAGE_KEY, initialLetters),
        set: (data: Letter[]) => saveToDb(LETTERS_STORAGE_KEY, data),
    },
     letterTemplates: {
        get: () => getFromDb<LetterTemplate[]>(LETTER_TEMPLATES_STORAGE_KEY, initialLetterTemplates),
        set: (data: LetterTemplate[]) => saveToDb(LETTER_TEMPLATES_STORAGE_KEY, data),
    },
    consultations: {
        get: () => getFromDb<Consultation[]>(CONSULTATIONS_STORAGE_KEY, initialConsultations),
        set: (data: Consultation[]) => saveToDb(CONSULTATIONS_STORAGE_KEY, data),
    },
    rejections: {
        get: () => getFromDb<(Rejection & { requestId: string })[]>(REJECTIONS_STORAGE_KEY, initialRejections),
        set: (data: (Rejection & { requestId: string })[]) => saveToDb(REJECTIONS_STORAGE_KEY, data),
    },
    roles: {
        get: () => getFromDb<Role[]>(ROLES_STORAGE_KEY, initialRoles),
        set: (data: Role[]) => saveToDb(ROLES_STORAGE_KEY, data),
    },
    orgUnits: {
        get: () => getFromDb<OrganizationalUnit[]>(ORG_UNITS_STORAGE_KEY, initialOrgUnits),
        set: (data: OrganizationalUnit[]) => saveToDb(ORG_UNITS_STORAGE_KEY, data),
    },
    requests: {
        get: () => getFromDb<Request[]>(REQUESTS_STORAGE_KEY, initialRequests),
        set: (data: Request[]) => saveToDb(REQUESTS_STORAGE_KEY, data),
    },
    workflows: {
        get: () => getFromDb<Workflow[]>(WORKFLOWS_STORAGE_KEY, initialWorkflows),
        set: (data: Workflow[]) => saveToDb(WORKFLOWS_STORAGE_KEY, data),
    },
    requestTypes: {
        get: () => getFromDb<RequestType[]>(REQUEST_TYPES_STORAGE_KEY, initialRequestTypes),
        set: (data: RequestType[]) => saveToDb(REQUEST_TYPES_STORAGE_KEY, data),
    },
    requestCounters: {
        get: () => getFromDb<Record<string, number>>(REQUEST_COUNTERS_STORAGE_KEY, initialRequestCounters),
        set: (data: Record<string, number>) => saveToDb(REQUEST_COUNTERS_STORAGE_KEY, data),
    }
};

// Initialize the in-memory store when this module is loaded.
initializeAllDbs();