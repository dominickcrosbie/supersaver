/* ==========================================
   SUPERKEEPER - CALCULATOR JAVASCRIPT
   ========================================== */

// Vue 3 Calculator Application
const { createApp, ref, computed, watch, onMounted } = Vue;

const calculatorApp = createApp({
    setup() {
        const currentYear = new Date().getFullYear();
        const arrivalYear = ref(currentYear - 1);
        const departureYear = ref(currentYear);
        const showResults = ref(false);
        
        // Superannuation calculation constants
        const superRate = 0.105; // Current super guarantee rate (10.5%)
        const taxRates = {
            'working': { rate: 0.35, label: 'Working Holiday (35%)' },
            'student': { rate: 0.35, label: 'Student Visa (35%)' },
            'skilled': { rate: 0.20, label: 'Skilled Visa (20%)' },
            'temporary': { rate: 0.20, label: 'Temporary Work (20%)' },
            'other': { rate: 0.35, label: 'Other (35%)' }
        };
        
        // Calculate years array based on arrival and departure years
        const years = computed(() => {
            const yearsArray = [];
            const startYear = parseInt(arrivalYear.value) || currentYear - 1;
            const endYear = parseInt(departureYear.value) || currentYear;
            
            if (startYear && endYear && startYear <= endYear) {
                for (let year = startYear; year <= endYear; year++) {
                    yearsArray.push(year);
                }
            }
            return yearsArray;
        });
        
        // Initialize salaries and visa types arrays
        const salaries = ref(Array(years.value.length).fill(0));
        const visaTypes = ref(Array(years.value.length).fill('working'));
        
        // Update arrays when years change
        watch(years, (newYears, oldYears) => {
            const newSalaries = [];
            const newVisaTypes = [];
            
            for (let i = 0; i < newYears.length; i++) {
                if (i < oldYears.length) {
                    newSalaries.push(salaries.value[i] || 0);
                    newVisaTypes.push(visaTypes.value[i] || 'working');
                } else {
                    newSalaries.push(0);
                    newVisaTypes.push('working');
                }
            }
            
            salaries.value = newSalaries;
            visaTypes.value = newVisaTypes;
        });
        
        // Calculate total superannuation accumulated
        const totalSuper = computed(() => {
            let total = 0;
            for (let i = 0; i < years.value.length; i++) {
                const salary = parseFloat(salaries.value[i]) || 0;
                total += salary * superRate;
            }
            return parseFloat(total.toFixed(2));
        });
        
        // Calculate average tax rate based on visa types
        const taxRate = computed(() => {
            if (visaTypes.value.length === 0) return 0.35;
            
            // Calculate weighted average based on visa types
            let totalTax = 0;
            const visaCounts = {};
            
            for (const visa of visaTypes.value) {
                visaCounts[visa] = (visaCounts[visa] || 0) + 1;
            }
            
            for (const [visa, count] of Object.entries(visaCounts)) {
                const rate = taxRates[visa]?.rate || 0.35;
                totalTax += rate * count;
            }
            
            return totalTax / visaTypes.value.length;
        });
        
        // Calculate tax amount (amount deducted)
        const taxAmount = computed(() => {
            return parseFloat((totalSuper.value * taxRate.value).toFixed(2));
        });
        
        // Calculate net withdrawal (amount received)
        const netWithdrawal = computed(() => {
            return parseFloat((totalSuper.value - taxAmount.value).toFixed(2));
        });
        
        // Format currency for display
        const formatCurrency = (value) => {
            return new Intl.NumberFormat('en-AU', {
                style: 'currency',
                currency: 'AUD',
                minimumFractionDigits: 2
            }).format(value);
        };
        
        // Get tax rate label
        const taxRateLabel = computed(() => {
            if (visaTypes.value.length === 0) return '35%';
            
            const visaCounts = {};
            for (const visa of visaTypes.value) {
                visaCounts[visa] = (visaCounts[visa] || 0) + 1;
            }
            
            let mostCommon = 'working';
            let maxCount = 0;
            
            for (const [visa, count] of Object.entries(visaCounts)) {
                if (count > maxCount) {
                    mostCommon = visa;
                    maxCount = count;
                }
            }
            
            return `${(taxRate.value * 100).toFixed(1)}%`;
        });
        
        // Calculate super
        const calculateSuper = () => {
            // Validate input
            let hasValidData = false;
            for (let i = 0; i < salaries.value.length; i++) {
                if (parseFloat(salaries.value[i]) > 0) {
                    hasValidData = true;
                    break;
                }
            }
            
            if (!hasValidData) {
                alert('Please enter at least one salary amount');
                return;
            }
            
            showResults.value = true;
            
            // Scroll to results
            setTimeout(() => {
                const resultsSection = document.querySelector('.results-container');
                if (resultsSection) {
                    resultsSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        };
        
        // Reset calculator
        const resetCalculator = () => {
            arrivalYear.value = currentYear - 1;
            departureYear.value = currentYear;
            salaries.value = Array(years.value.length).fill(0);
            visaTypes.value = Array(years.value.length).fill('working');
            showResults.value = false;
        };
        
        return {
            currentYear,
            arrivalYear,
            departureYear,
            years,
            salaries,
            visaTypes,
            totalSuper,
            taxRate,
            taxAmount,
            netWithdrawal,
            showResults,
            calculateSuper,
            resetCalculator,
            formatCurrency,
            taxRateLabel,
            taxRates
        };
    }
});

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const appElement = document.getElementById('calculator-app');
    if (appElement) {
        calculatorApp.mount('#calculator-app');
    }
});
