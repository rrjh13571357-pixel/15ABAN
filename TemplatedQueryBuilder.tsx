import React, { useState, useEffect, useMemo, useRef } from 'react';
import { getTemplates } from '../frontend/src/services/analysisService';
import { getProjects } from '../frontend/src/services/projectService';
import { getContractList } from '../frontend/src/services/contractService';
import { getSystemUsers } from '../frontend/src/services/identityService';
import type { TemplatedQuery, Project, Contract, SystemUser } from '../shared/types';
import { ChevronUpDownIcon, PaperAirplaneIcon } from '../frontend/src/components/Icons';

interface TemplatedQueryBuilderProps {
    onQuerySubmit: (query: string) => void;
    isLoading: boolean;
}

type Entity = Project | Contract | SystemUser;

const TemplatedQueryBuilder: React.FC<TemplatedQueryBuilderProps> = ({ onQuerySubmit, isLoading }) => {
    const [templates, setTemplates] = useState<TemplatedQuery[]>([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
    
    const [entityData, setEntityData] = useState<Entity[]>([]);
    const [isEntityLoading, setIsEntityLoading] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const selectedTemplate = useMemo(() => templates.find(t => t.id === selectedTemplateId), [templates, selectedTemplateId]);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const data = await getTemplates();
                setTemplates(data);
            } catch (e) {
                console.error("Failed to fetch templates", e);
            }
        };
        fetchTemplates();
    }, []);

    useEffect(() => {
        const fetchEntityData = async () => {
            if (!selectedTemplate) return;

            setIsEntityLoading(true);
            setEntityData([]);
            setSelectedEntity(null);
            setSearchTerm('');

            try {
                let data: Entity[] = [];
                switch (selectedTemplate.entityType) {
                    case 'project':
                        data = await getProjects();
                        break;
                    case 'contract':
                        data = await getContractList();
                        break;
                    case 'user':
                        data = await getSystemUsers();
                        break;
                }
                setEntityData(data);
            } catch (e) {
                console.error(`Failed to fetch ${selectedTemplate.entityType} data`, e);
            } finally {
                setIsEntityLoading(false);
            }
        };
        fetchEntityData();
    }, [selectedTemplate]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getEntityName = (entity: Entity | null): string => {
        if (!entity) return '';
        if ('fullName' in entity) return entity.fullName; // SystemUser
        if ('name' in entity) return entity.name; // Project
        if ('title' in entity) return entity.title; // Contract
        return '';
    }

    const filteredEntities = useMemo(() => {
        if (!searchTerm) return entityData;
        return entityData.filter(e => {
            const name = getEntityName(e);
            return name.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [searchTerm, entityData]);

    const handleSelectEntity = (entity: Entity) => {
        setSelectedEntity(entity);
        setSearchTerm(getEntityName(entity));
        setIsDropdownOpen(false);
    };

    const handleSubmit = () => {
        if (!selectedTemplate || !selectedEntity) return;
        const entityName = getEntityName(selectedEntity);
        const finalQuery = selectedTemplate.template.replace('{{entity}}', entityName);
        onQuerySubmit(finalQuery);
    };


    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">پرسش‌های هوشمند الگو</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                <div className="md:col-span-1">
                    <label className="block text-xs font-medium text-gray-600 mb-1">۱. الگو را انتخاب کنید</label>
                    <select
                        value={selectedTemplateId}
                        onChange={(e) => setSelectedTemplateId(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md bg-white text-sm"
                        disabled={isLoading}
                    >
                        <option value="">-- انتخاب کنید --</option>
                        {templates.map(t => <option key={t.id} value={t.id}>{t.displayText}</option>)}
                    </select>
                </div>
                {selectedTemplate && (
                    <div className="relative md:col-span-1" ref={dropdownRef}>
                        <label className="block text-xs font-medium text-gray-600 mb-1">۲. مورد را مشخص کنید</label>
                         <div className="relative">
                            <input
                                type="text"
                                placeholder={isEntityLoading ? "در حال بارگذاری..." : "جستجو یا انتخاب کنید..."}
                                value={searchTerm}
                                onChange={(e) => { setSearchTerm(e.target.value); setSelectedEntity(null); }}
                                onFocus={() => setIsDropdownOpen(true)}
                                className="w-full p-2 pr-10 border border-gray-300 rounded-md text-sm"
                                disabled={isEntityLoading || isLoading}
                                autoComplete="off"
                            />
                             <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                <ChevronUpDownIcon />
                            </button>
                         </div>
                        {isDropdownOpen && !isEntityLoading && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg">
                               {filteredEntities.length > 0 ? (
                                    filteredEntities.map(entity => (
                                        <li key={entity.id} className="p-2 cursor-pointer hover:bg-gray-100 text-sm" onClick={() => handleSelectEntity(entity)}>
                                            {getEntityName(entity)}
                                        </li>
                                    ))
                               ) : (
                                   <li className="p-2 text-gray-500 text-sm">موردی یافت نشد.</li>
                               )}
                            </ul>
                        )}
                    </div>
                )}
                {selectedTemplate && (
                    <div className="md:col-span-1">
                         <button
                            onClick={handleSubmit}
                            disabled={!selectedEntity || isLoading}
                            className="w-full flex items-center justify-center p-2 bg-purple-600 text-white rounded-md font-semibold text-sm transition-colors disabled:bg-gray-400 enabled:hover:bg-purple-700"
                        >
                            <PaperAirplaneIcon className="w-5 h-5 ml-2 transform -rotate-45" />
                            ارسال برای تحلیل
                        </button>
                    </div>
                )}
            </div>
             {selectedTemplate && <p className="text-xs text-gray-500">{selectedTemplate.description}</p>}
        </div>
    );
};

export default TemplatedQueryBuilder;