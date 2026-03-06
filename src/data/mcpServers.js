// 40+ Fake MCP Server Definitions
// Each server has: id, name, category, description, baseUrl, endpoints
// Each endpoint has: path, method, expectedSchema, fakeResponse

export const MCP_SERVERS = [
  {
    id: "car-inventory-mcp",
    name: "Car Inventory MCP",
    category: "Automotive",
    description: "Manages vehicle inventory, stock levels, and dealership data",
    color: "#3b82f6",
    endpoints: [
      {
        id: "get-vehicles",
        name: "Get Vehicles",
        path: "/api/v1/vehicles",
        method: "GET",
        description: "Returns list of available vehicles",
        expectedSchema: {
          status: "string",
          data: {
            vehicles: [
              {
                id: "string",
                make: "string",
                model: "string",
                year: "number",
                price: "number",
                available: "boolean",
                vin: "string",
              },
            ],
            total: "number",
            page: "number",
          },
          timestamp: "string",
        },
        fakeResponse: {
          status: "success",
          data: {
            vehicles: [
              { id: "v001", make: "Toyota", model: "Camry", year: 2024, price: 27000, available: true, vin: "1HGCM82633A004352" },
              { id: "v002", make: "Honda", model: "Accord", year: 2024, price: 29500, available: false, vin: "2HGFG12627H532145" },
            ],
            total: 245,
            page: 1,
          },
          timestamp: "2026-03-05T10:30:00Z",
        },
      },
      {
        id: "get-vehicle-detail",
        name: "Get Vehicle Detail",
        path: "/api/v1/vehicles/:id",
        method: "GET",
        description: "Returns detailed info for a specific vehicle",
        expectedSchema: {
          status: "string",
          data: {
            id: "string",
            make: "string",
            model: "string",
            year: "number",
            price: "number",
            available: "boolean",
            vin: "string",
            features: ["string"],
            dealer: { id: "string", name: "string", location: "string" },
          },
          timestamp: "string",
        },
        fakeResponse: {
          status: "success",
          data: {
            id: "v001",
            make: "Toyota",
            model: "Camry",
            year: 2024,
            price: 27000,
            available: true,
            vin: "1HGCM82633A004352",
            features: ["Bluetooth", "Backup Camera", "Lane Assist"],
            dealer: { id: "d01", name: "City Toyota", location: "Austin, TX" },
          },
          timestamp: "2026-03-05T10:30:00Z",
        },
      },
    ],
  },

  {
    id: "hr-payroll-mcp",
    name: "HR Payroll MCP",
    category: "Human Resources",
    description: "Handles employee payroll, deductions, and salary processing",
    color: "#8b5cf6",
    endpoints: [
      {
        id: "get-payroll",
        name: "Get Payroll Summary",
        path: "/api/v1/payroll/summary",
        method: "GET",
        description: "Returns payroll summary for current period",
        expectedSchema: {
          status: "string",
          data: {
            period: "string",
            totalEmployees: "number",
            totalGrossPay: "number",
            totalDeductions: "number",
            totalNetPay: "number",
            currency: "string",
          },
          metadata: { generatedAt: "string", approvedBy: "string" },
        },
        fakeResponse: {
          status: "success",
          data: {
            period: "2026-02",
            totalEmployees: 342,
            totalGrossPay: 4200000,
            totalDeductions: 840000,
            totalNetPay: 3360000,
            currency: "USD",
          },
          metadata: { generatedAt: "2026-03-01T00:00:00Z", approvedBy: "finance-admin" },
        },
      },
      {
        id: "get-employee-payslip",
        name: "Get Employee Payslip",
        path: "/api/v1/payroll/payslip/:employeeId",
        method: "GET",
        description: "Returns individual payslip for an employee",
        expectedSchema: {
          status: "string",
          data: {
            employeeId: "string",
            name: "string",
            department: "string",
            grossPay: "number",
            deductions: { tax: "number", insurance: "number", retirement: "number" },
            netPay: "number",
            payDate: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            employeeId: "EMP-1042",
            name: "Sarah Johnson",
            department: "Engineering",
            grossPay: 8500,
            deductions: { tax: 1700, insurance: 320, retirement: 425 },
            netPay: 6055,
            payDate: "2026-02-28",
          },
        },
      },
    ],
  },

  {
    id: "healthcare-patient-mcp",
    name: "Healthcare Patient MCP",
    category: "Healthcare",
    description: "Patient records, appointments, and medical history management",
    color: "#ef4444",
    endpoints: [
      {
        id: "get-patient",
        name: "Get Patient Record",
        path: "/api/v1/patients/:patientId",
        method: "GET",
        description: "Returns patient medical record",
        expectedSchema: {
          status: "string",
          data: {
            patientId: "string",
            name: "string",
            dob: "string",
            bloodType: "string",
            allergies: ["string"],
            conditions: ["string"],
            primaryPhysician: { id: "string", name: "string" },
          },
          hipaaCompliant: "boolean",
        },
        fakeResponse: {
          status: "success",
          data: {
            patientId: "PAT-9981",
            name: "Michael Chen",
            dob: "1985-04-12",
            bloodType: "O+",
            allergies: ["Penicillin", "Shellfish"],
            conditions: ["Hypertension", "Type 2 Diabetes"],
            primaryPhysician: { id: "DR-042", name: "Dr. Emily Torres" },
          },
          hipaaCompliant: true,
        },
      },
      {
        id: "get-appointments",
        name: "Get Appointments",
        path: "/api/v1/appointments",
        method: "GET",
        description: "Returns upcoming appointments",
        expectedSchema: {
          status: "string",
          data: {
            appointments: [
              {
                id: "string",
                patientId: "string",
                doctorId: "string",
                scheduledAt: "string",
                type: "string",
                status: "string",
              },
            ],
            total: "number",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            appointments: [
              { id: "APT-001", patientId: "PAT-9981", doctorId: "DR-042", scheduledAt: "2026-03-10T09:00:00Z", type: "Follow-up", status: "confirmed" },
              { id: "APT-002", patientId: "PAT-1120", doctorId: "DR-017", scheduledAt: "2026-03-11T14:30:00Z", type: "Consultation", status: "pending" },
            ],
            total: 48,
          },
        },
      },
    ],
  },

  {
    id: "logistics-tracking-mcp",
    name: "Logistics Tracking MCP",
    category: "Logistics",
    description: "Real-time shipment tracking and delivery management",
    color: "#f59e0b",
    endpoints: [
      {
        id: "track-shipment",
        name: "Track Shipment",
        path: "/api/v1/shipments/:trackingId",
        method: "GET",
        description: "Returns real-time shipment tracking data",
        expectedSchema: {
          status: "string",
          data: {
            trackingId: "string",
            origin: "string",
            destination: "string",
            currentLocation: "string",
            estimatedDelivery: "string",
            status: "string",
            events: [{ timestamp: "string", location: "string", event: "string" }],
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            trackingId: "TRK-88291",
            origin: "Los Angeles, CA",
            destination: "New York, NY",
            currentLocation: "Denver, CO",
            estimatedDelivery: "2026-03-08",
            status: "in_transit",
            events: [
              { timestamp: "2026-03-05T06:00:00Z", location: "Denver, CO", event: "Package arrived at sorting facility" },
              { timestamp: "2026-03-04T22:00:00Z", location: "Salt Lake City, UT", event: "Departed distribution center" },
            ],
          },
        },
      },
    ],
  },

  {
    id: "finance-banking-mcp",
    name: "Finance Banking MCP",
    category: "Finance",
    description: "Account balances, transactions, and banking operations",
    color: "#10b981",
    endpoints: [
      {
        id: "get-account",
        name: "Get Account Summary",
        path: "/api/v1/accounts/:accountId",
        method: "GET",
        description: "Returns account balance and summary",
        expectedSchema: {
          status: "string",
          data: {
            accountId: "string",
            accountType: "string",
            balance: "number",
            currency: "string",
            owner: "string",
            lastTransaction: "string",
            status: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            accountId: "ACC-00421",
            accountType: "checking",
            balance: 12450.75,
            currency: "USD",
            owner: "James Williams",
            lastTransaction: "2026-03-04T15:22:00Z",
            status: "active",
          },
        },
      },
    ],
  },

  {
    id: "ecommerce-orders-mcp",
    name: "E-Commerce Orders MCP",
    category: "E-Commerce",
    description: "Order management, cart, and purchase workflows",
    color: "#f97316",
    endpoints: [
      {
        id: "get-order",
        name: "Get Order",
        path: "/api/v1/orders/:orderId",
        method: "GET",
        description: "Returns full order details",
        expectedSchema: {
          status: "string",
          data: {
            orderId: "string",
            customerId: "string",
            items: [{ productId: "string", name: "string", quantity: "number", unitPrice: "number" }],
            subtotal: "number",
            tax: "number",
            total: "number",
            shippingAddress: { street: "string", city: "string", state: "string", zip: "string" },
            orderStatus: "string",
            createdAt: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            orderId: "ORD-7729",
            customerId: "CUST-334",
            items: [
              { productId: "PROD-101", name: "Wireless Headphones", quantity: 1, unitPrice: 149.99 },
              { productId: "PROD-208", name: "USB-C Cable", quantity: 2, unitPrice: 12.99 },
            ],
            subtotal: 175.97,
            tax: 14.08,
            total: 190.05,
            shippingAddress: { street: "123 Main St", city: "Austin", state: "TX", zip: "78701" },
            orderStatus: "shipped",
            createdAt: "2026-03-02T14:00:00Z",
          },
        },
      },
    ],
  },

  {
    id: "real-estate-mcp",
    name: "Real Estate MCP",
    category: "Real Estate",
    description: "Property listings, valuations, and transaction management",
    color: "#06b6d4",
    endpoints: [
      {
        id: "get-listings",
        name: "Get Property Listings",
        path: "/api/v1/properties",
        method: "GET",
        description: "Returns available property listings",
        expectedSchema: {
          status: "string",
          data: {
            properties: [
              { id: "string", address: "string", price: "number", bedrooms: "number", bathrooms: "number", sqft: "number", type: "string", listed: "string" },
            ],
            total: "number",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            properties: [
              { id: "PROP-001", address: "456 Oak Ave, Dallas TX 75201", price: 485000, bedrooms: 4, bathrooms: 3, sqft: 2400, type: "single-family", listed: "2026-02-15" },
              { id: "PROP-002", address: "789 Pine Rd, Austin TX 78702", price: 320000, bedrooms: 3, bathrooms: 2, sqft: 1800, type: "townhouse", listed: "2026-03-01" },
            ],
            total: 1240,
          },
        },
      },
    ],
  },

  {
    id: "insurance-claims-mcp",
    name: "Insurance Claims MCP",
    category: "Insurance",
    description: "Claims processing, policy management, and coverage verification",
    color: "#84cc16",
    endpoints: [
      {
        id: "get-claim",
        name: "Get Claim Status",
        path: "/api/v1/claims/:claimId",
        method: "GET",
        description: "Returns claim processing status",
        expectedSchema: {
          status: "string",
          data: {
            claimId: "string",
            policyNumber: "string",
            claimType: "string",
            amount: "number",
            submittedAt: "string",
            status: "string",
            adjuster: { id: "string", name: "string", contact: "string" },
            estimatedResolution: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            claimId: "CLM-44821",
            policyNumber: "POL-88210",
            claimType: "auto_collision",
            amount: 8750.0,
            submittedAt: "2026-02-28T10:00:00Z",
            status: "under_review",
            adjuster: { id: "ADJ-12", name: "Robert Kim", contact: "rkim@insure.com" },
            estimatedResolution: "2026-03-15",
          },
        },
      },
    ],
  },

  {
    id: "education-lms-mcp",
    name: "Education LMS MCP",
    category: "Education",
    description: "Course management, student progress, and enrollment data",
    color: "#a855f7",
    endpoints: [
      {
        id: "get-course",
        name: "Get Course Details",
        path: "/api/v1/courses/:courseId",
        method: "GET",
        description: "Returns course information and enrollment",
        expectedSchema: {
          status: "string",
          data: {
            courseId: "string",
            title: "string",
            instructor: "string",
            enrolled: "number",
            capacity: "number",
            modules: [{ id: "string", title: "string", duration: "number", completed: "boolean" }],
            startDate: "string",
            endDate: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            courseId: "COURSE-301",
            title: "Advanced Data Structures",
            instructor: "Prof. Angela Davis",
            enrolled: 87,
            capacity: 100,
            modules: [
              { id: "MOD-01", title: "Arrays & Linked Lists", duration: 120, completed: true },
              { id: "MOD-02", title: "Trees & Graphs", duration: 180, completed: false },
            ],
            startDate: "2026-01-15",
            endDate: "2026-05-30",
          },
        },
      },
    ],
  },

  {
    id: "hotel-booking-mcp",
    name: "Hotel Booking MCP",
    category: "Hospitality",
    description: "Hotel reservations, room availability, and guest management",
    color: "#ec4899",
    endpoints: [
      {
        id: "get-reservation",
        name: "Get Reservation",
        path: "/api/v1/reservations/:reservationId",
        method: "GET",
        description: "Returns reservation details",
        expectedSchema: {
          status: "string",
          data: {
            reservationId: "string",
            guestName: "string",
            roomNumber: "string",
            roomType: "string",
            checkIn: "string",
            checkOut: "string",
            nights: "number",
            ratePerNight: "number",
            totalAmount: "number",
            status: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            reservationId: "RES-992",
            guestName: "Lisa Park",
            roomNumber: "412",
            roomType: "deluxe_suite",
            checkIn: "2026-03-10",
            checkOut: "2026-03-14",
            nights: 4,
            ratePerNight: 299.0,
            totalAmount: 1196.0,
            status: "confirmed",
          },
        },
      },
    ],
  },
  {
    id: "fleet-management-mcp",
    name: "Fleet Management MCP",
    category: "Automotive",
    description: "Commercial fleet tracking, maintenance, and fuel management",
    color: "#3b82f6",
    endpoints: [
      {
        id: "get-fleet-status",
        name: "Get Fleet Status",
        path: "/api/v1/fleet/status",
        method: "GET",
        description: "Returns status of all fleet vehicles",
        expectedSchema: {
          status: "string",
          data: {
            totalVehicles: "number",
            active: "number",
            maintenance: "number",
            idle: "number",
            vehicles: [{ id: "string", plateNumber: "string", driver: "string", status: "string", location: "string", fuelLevel: "number" }],
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            totalVehicles: 48,
            active: 31,
            maintenance: 5,
            idle: 12,
            vehicles: [
              { id: "FLT-001", plateNumber: "TX-4821", driver: "Carlos Mendez", status: "active", location: "Houston, TX", fuelLevel: 78 },
              { id: "FLT-002", plateNumber: "TX-5503", driver: "Unassigned", status: "idle", location: "Dallas, TX", fuelLevel: 95 },
            ],
          },
        },
      },
    ],
  },

  {
    id: "recruitment-mcp",
    name: "Recruitment MCP",
    category: "Human Resources",
    description: "Job postings, applicant tracking, and interview scheduling",
    color: "#8b5cf6",
    endpoints: [
      {
        id: "get-job-postings",
        name: "Get Job Postings",
        path: "/api/v1/jobs",
        method: "GET",
        description: "Returns active job postings",
        expectedSchema: {
          status: "string",
          data: {
            jobs: [
              { id: "string", title: "string", department: "string", location: "string", type: "string", postedAt: "string", applicants: "number", status: "string" },
            ],
            total: "number",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            jobs: [
              { id: "JOB-101", title: "Senior Software Engineer", department: "Engineering", location: "Remote", type: "full-time", postedAt: "2026-02-20", applicants: 142, status: "active" },
              { id: "JOB-102", title: "Product Manager", department: "Product", location: "Austin, TX", type: "full-time", postedAt: "2026-02-25", applicants: 89, status: "active" },
            ],
            total: 23,
          },
        },
      },
    ],
  },

  {
    id: "pharmacy-mcp",
    name: "Pharmacy MCP",
    category: "Healthcare",
    description: "Prescription management, drug inventory, and dispensing records",
    color: "#ef4444",
    endpoints: [
      {
        id: "get-prescription",
        name: "Get Prescription",
        path: "/api/v1/prescriptions/:rxId",
        method: "GET",
        description: "Returns prescription details",
        expectedSchema: {
          status: "string",
          data: {
            rxId: "string",
            patientId: "string",
            medication: "string",
            dosage: "string",
            quantity: "number",
            refills: "number",
            prescribedBy: "string",
            prescribedAt: "string",
            expiresAt: "string",
            status: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            rxId: "RX-77421",
            patientId: "PAT-9981",
            medication: "Metformin",
            dosage: "500mg twice daily",
            quantity: 60,
            refills: 3,
            prescribedBy: "Dr. Emily Torres",
            prescribedAt: "2026-02-15",
            expiresAt: "2027-02-15",
            status: "active",
          },
        },
      },
    ],
  },
  {
    id: "warehouse-inventory-mcp",
    name: "Warehouse Inventory MCP",
    category: "Logistics",
    description: "Warehouse stock, SKU management, and replenishment tracking",
    color: "#f59e0b",
    endpoints: [
      {
        id: "get-stock",
        name: "Get Stock Levels",
        path: "/api/v1/warehouse/stock",
        method: "GET",
        description: "Returns current stock levels",
        expectedSchema: {
          status: "string",
          data: {
            warehouseId: "string",
            items: [{ sku: "string", name: "string", quantity: "number", reorderPoint: "number", location: "string", lastUpdated: "string" }],
            totalItems: "number",
            lowStockAlerts: "number",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            warehouseId: "WH-Austin-01",
            items: [
              { sku: "SKU-10021", name: "Widget A", quantity: 2840, reorderPoint: 500, location: "Aisle 3, Shelf B", lastUpdated: "2026-03-05T08:00:00Z" },
              { sku: "SKU-10022", name: "Widget B", quantity: 120, reorderPoint: 200, location: "Aisle 5, Shelf D", lastUpdated: "2026-03-05T08:00:00Z" },
            ],
            totalItems: 1820,
            lowStockAlerts: 14,
          },
        },
      },
    ],
  },
  {
    id: "tax-compliance-mcp",
    name: "Tax Compliance MCP",
    category: "Finance",
    description: "Tax calculation, filing status, and compliance reporting",
    color: "#10b981",
    endpoints: [
      {
        id: "get-tax-summary",
        name: "Get Tax Summary",
        path: "/api/v1/tax/summary/:year",
        method: "GET",
        description: "Returns annual tax summary",
        expectedSchema: {
          status: "string",
          data: {
            taxYear: "number",
            entityId: "string",
            totalRevenue: "number",
            taxableIncome: "number",
            taxOwed: "number",
            taxPaid: "number",
            balance: "number",
            filingStatus: "string",
            dueDate: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            taxYear: 2025,
            entityId: "CORP-11291",
            totalRevenue: 8500000,
            taxableIncome: 2100000,
            taxOwed: 441000,
            taxPaid: 420000,
            balance: 21000,
            filingStatus: "filed",
            dueDate: "2026-04-15",
          },
        },
      },
    ],
  },
  {
    id: "restaurant-pos-mcp",
    name: "Restaurant POS MCP",
    category: "Hospitality",
    description: "Point-of-sale, table management, and kitchen order routing",
    color: "#ec4899",
    endpoints: [
      {
        id: "get-orders",
        name: "Get Active Orders",
        path: "/api/v1/pos/orders/active",
        method: "GET",
        description: "Returns currently active orders",
        expectedSchema: {
          status: "string",
          data: {
            orders: [
              { orderId: "string", tableNumber: "number", server: "string", items: [{ name: "string", quantity: "number", price: "number" }], total: "number", status: "string", createdAt: "string" },
            ],
            totalActive: "number",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            orders: [
              {
                orderId: "POS-441",
                tableNumber: 7,
                server: "Amy Chen",
                items: [
                  { name: "Grilled Salmon", quantity: 2, price: 32.0 },
                  { name: "Caesar Salad", quantity: 1, price: 14.0 },
                ],
                total: 78.0,
                status: "preparing",
                createdAt: "2026-03-05T19:05:00Z",
              },
            ],
            totalActive: 12,
          },
        },
      },
    ],
  },

  {
    id: "cybersecurity-mcp",
    name: "Cybersecurity MCP",
    category: "Security",
    description: "Threat detection, vulnerability scanning, and security alerts",
    color: "#dc2626",
    endpoints: [
      {
        id: "get-alerts",
        name: "Get Security Alerts",
        path: "/api/v1/security/alerts",
        method: "GET",
        description: "Returns active security alerts",
        expectedSchema: {
          status: "string",
          data: {
            alerts: [
              { id: "string", severity: "string", type: "string", source: "string", description: "string", detectedAt: "string", resolved: "boolean" },
            ],
            criticalCount: "number",
            highCount: "number",
            totalUnresolved: "number",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            alerts: [
              { id: "ALERT-9921", severity: "critical", type: "brute_force", source: "192.168.1.45", description: "Multiple failed login attempts detected", detectedAt: "2026-03-05T09:45:00Z", resolved: false },
              { id: "ALERT-9920", severity: "high", type: "unusual_traffic", source: "10.0.0.88", description: "Anomalous outbound traffic spike", detectedAt: "2026-03-05T08:30:00Z", resolved: false },
            ],
            criticalCount: 1,
            highCount: 4,
            totalUnresolved: 7,
          },
        },
      },
    ],
  },

  {
    id: "crm-customers-mcp",
    name: "CRM Customers MCP",
    category: "Sales",
    description: "Customer relationship management, contacts, and deal tracking",
    color: "#0ea5e9",
    endpoints: [
      {
        id: "get-customer",
        name: "Get Customer",
        path: "/api/v1/customers/:customerId",
        method: "GET",
        description: "Returns customer profile and history",
        expectedSchema: {
          status: "string",
          data: {
            customerId: "string",
            name: "string",
            email: "string",
            phone: "string",
            company: "string",
            tier: "string",
            totalRevenue: "number",
            deals: [{ id: "string", title: "string", value: "number", stage: "string" }],
            assignedRep: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            customerId: "CUST-8821",
            name: "Thomas Bradley",
            email: "t.bradley@acmecorp.com",
            phone: "+1-512-555-0192",
            company: "Acme Corp",
            tier: "enterprise",
            totalRevenue: 420000,
            deals: [
              { id: "DEAL-101", title: "Platform Renewal 2026", value: 120000, stage: "negotiation" },
            ],
            assignedRep: "Jessica Moore",
          },
        },
      },
    ],
  },

  {
    id: "supply-chain-mcp",
    name: "Supply Chain MCP",
    category: "Logistics",
    description: "Supplier management, purchase orders, and procurement tracking",
    color: "#f59e0b",
    endpoints: [
      {
        id: "get-purchase-order",
        name: "Get Purchase Order",
        path: "/api/v1/purchase-orders/:poId",
        method: "GET",
        description: "Returns purchase order details",
        expectedSchema: {
          status: "string",
          data: {
            poId: "string",
            supplierId: "string",
            supplierName: "string",
            items: [{ sku: "string", description: "string", quantity: "number", unitCost: "number" }],
            totalAmount: "number",
            currency: "string",
            orderDate: "string",
            expectedDelivery: "string",
            status: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            poId: "PO-22091",
            supplierId: "SUP-441",
            supplierName: "Global Parts Inc.",
            items: [
              { sku: "PART-8821", description: "Steel Bracket Assembly", quantity: 500, unitCost: 12.5 },
            ],
            totalAmount: 6250.0,
            currency: "USD",
            orderDate: "2026-03-01",
            expectedDelivery: "2026-03-20",
            status: "confirmed",
          },
        },
      },
    ],
  },

  {
    id: "hr-attendance-mcp",
    name: "HR Attendance MCP",
    category: "Human Resources",
    description: "Time tracking, attendance records, and leave management",
    color: "#8b5cf6",
    endpoints: [
      {
        id: "get-attendance",
        name: "Get Attendance Report",
        path: "/api/v1/attendance/report",
        method: "GET",
        description: "Returns attendance summary for a period",
        expectedSchema: {
          status: "string",
          data: {
            period: "string",
            totalEmployees: "number",
            presentToday: "number",
            onLeave: "number",
            records: [{ employeeId: "string", name: "string", checkIn: "string", checkOut: "string", hoursWorked: "number", status: "string" }],
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            period: "2026-03-05",
            totalEmployees: 342,
            presentToday: 298,
            onLeave: 22,
            records: [
              { employeeId: "EMP-1042", name: "Sarah Johnson", checkIn: "08:54", checkOut: "17:30", hoursWorked: 8.6, status: "present" },
              { employeeId: "EMP-1043", name: "David Kim", checkIn: null, checkOut: null, hoursWorked: 0, status: "on_leave" },
            ],
          },
        },
      },
    ],
  },

  {
    id: "telemedicine-mcp",
    name: "Telemedicine MCP",
    category: "Healthcare",
    description: "Virtual consultations, video sessions, and remote patient monitoring",
    color: "#ef4444",
    endpoints: [
      {
        id: "get-session",
        name: "Get Telemedicine Session",
        path: "/api/v1/sessions/:sessionId",
        method: "GET",
        description: "Returns telemedicine session details",
        expectedSchema: {
          status: "string",
          data: {
            sessionId: "string",
            patientId: "string",
            doctorId: "string",
            scheduledAt: "string",
            duration: "number",
            platform: "string",
            meetingLink: "string",
            status: "string",
            notes: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            sessionId: "SESS-5521",
            patientId: "PAT-9981",
            doctorId: "DR-042",
            scheduledAt: "2026-03-08T11:00:00Z",
            duration: 30,
            platform: "SecureHealth",
            meetingLink: "https://securehealth.io/join/SESS-5521",
            status: "scheduled",
            notes: "Follow-up for blood pressure management",
          },
        },
      },
    ],
  },

  {
    id: "airline-booking-mcp",
    name: "Airline Booking MCP",
    category: "Travel",
    description: "Flight search, reservation, and passenger management",
    color: "#6366f1",
    endpoints: [
      {
        id: "get-booking",
        name: "Get Flight Booking",
        path: "/api/v1/bookings/:bookingRef",
        method: "GET",
        description: "Returns flight booking details",
        expectedSchema: {
          status: "string",
          data: {
            bookingRef: "string",
            passenger: { name: "string", passport: "string", seatClass: "string" },
            flight: { number: "string", from: "string", to: "string", departure: "string", arrival: "string", airline: "string" },
            fare: "number",
            currency: "string",
            status: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            bookingRef: "AA-8821XZ",
            passenger: { name: "Kevin Torres", passport: "US9821441", seatClass: "business" },
            flight: { number: "AA 441", from: "DFW", to: "JFK", departure: "2026-03-10T08:30:00Z", arrival: "2026-03-10T12:45:00Z", airline: "American Airlines" },
            fare: 1240.0,
            currency: "USD",
            status: "confirmed",
          },
        },
      },
    ],
  },

  {
    id: "smart-grid-mcp",
    name: "Smart Grid MCP",
    category: "Energy",
    description: "Power grid monitoring, energy consumption, and load balancing",
    color: "#facc15",
    endpoints: [
      {
        id: "get-grid-status",
        name: "Get Grid Status",
        path: "/api/v1/grid/status",
        method: "GET",
        description: "Returns current power grid status",
        expectedSchema: {
          status: "string",
          data: {
            gridId: "string",
            totalCapacity: "number",
            currentLoad: "number",
            loadPercentage: "number",
            regions: [{ id: "string", name: "string", status: "string", load: "number" }],
            outages: "number",
            lastUpdated: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            gridId: "GRID-TX-ERCOT",
            totalCapacity: 85000,
            currentLoad: 62400,
            loadPercentage: 73.4,
            regions: [
              { id: "REG-NORTH", name: "North Texas", status: "normal", load: 18200 },
              { id: "REG-SOUTH", name: "South Texas", status: "high", load: 22100 },
            ],
            outages: 2,
            lastUpdated: "2026-03-05T10:00:00Z",
          },
        },
      },
    ],
  },

  {
    id: "legal-case-mcp",
    name: "Legal Case MCP",
    category: "Legal",
    description: "Case management, document tracking, and court scheduling",
    color: "#78716c",
    endpoints: [
      {
        id: "get-case",
        name: "Get Case Summary",
        path: "/api/v1/cases/:caseId",
        method: "GET",
        description: "Returns legal case summary",
        expectedSchema: {
          status: "string",
          data: {
            caseId: "string",
            caseNumber: "string",
            title: "string",
            client: "string",
            attorney: "string",
            type: "string",
            court: "string",
            filedAt: "string",
            nextHearing: "string",
            status: "string",
            documents: "number",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            caseId: "CASE-4421",
            caseNumber: "2026-CV-00441",
            title: "Williams vs. Acme Corp",
            client: "Thomas Williams",
            attorney: "Jennifer Adams",
            type: "civil_litigation",
            court: "Travis County District Court",
            filedAt: "2026-01-10",
            nextHearing: "2026-04-15",
            status: "active",
            documents: 47,
          },
        },
      },
    ],
  },

  {
    id: "manufacturing-mcp",
    name: "Manufacturing MCP",
    category: "Manufacturing",
    description: "Production line status, quality control, and machine telemetry",
    color: "#64748b",
    endpoints: [
      {
        id: "get-production",
        name: "Get Production Status",
        path: "/api/v1/production/status",
        method: "GET",
        description: "Returns production line status",
        expectedSchema: {
          status: "string",
          data: {
            facilityId: "string",
            lines: [{ lineId: "string", product: "string", unitsPerHour: "number", target: "number", efficiency: "number", status: "string" }],
            totalOutput: "number",
            qualityRate: "number",
            defects: "number",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            facilityId: "PLANT-Austin-02",
            lines: [
              { lineId: "LINE-A", product: "Model X Assembly", unitsPerHour: 42, target: 45, efficiency: 93.3, status: "running" },
              { lineId: "LINE-B", product: "Widget Housing", unitsPerHour: 0, target: 120, efficiency: 0, status: "maintenance" },
            ],
            totalOutput: 1840,
            qualityRate: 98.7,
            defects: 24,
          },
        },
      },
    ],
  },

  {
    id: "social-media-analytics-mcp",
    name: "Social Media Analytics MCP",
    category: "Marketing",
    description: "Social media performance metrics, engagement, and audience data",
    color: "#f43f5e",
    endpoints: [
      {
        id: "get-analytics",
        name: "Get Social Analytics",
        path: "/api/v1/analytics/social",
        method: "GET",
        description: "Returns social media analytics",
        expectedSchema: {
          status: "string",
          data: {
            period: "string",
            platforms: [{ name: "string", followers: "number", impressions: "number", engagements: "number", clicks: "number", engagementRate: "number" }],
            totalReach: "number",
            topPost: { id: "string", platform: "string", content: "string", likes: "number" },
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            period: "2026-02",
            platforms: [
              { name: "LinkedIn", followers: 24800, impressions: 182000, engagements: 9100, clicks: 3200, engagementRate: 5.0 },
              { name: "Twitter/X", followers: 15200, impressions: 94000, engagements: 4700, clicks: 1800, engagementRate: 5.0 },
            ],
            totalReach: 276000,
            topPost: { id: "POST-8821", platform: "LinkedIn", content: "We just launched our new product!", likes: 1240 },
          },
        },
      },
    ],
  },

  {
    id: "asset-management-mcp",
    name: "Asset Management MCP",
    category: "Finance",
    description: "Investment portfolio tracking, asset allocation, and performance analytics",
    color: "#10b981",
    endpoints: [
      {
        id: "get-portfolio",
        name: "Get Portfolio Summary",
        path: "/api/v1/portfolio/:portfolioId",
        method: "GET",
        description: "Returns investment portfolio summary",
        expectedSchema: {
          status: "string",
          data: {
            portfolioId: "string",
            owner: "string",
            totalValue: "number",
            currency: "string",
            ytdReturn: "number",
            ytdReturnPercent: "number",
            holdings: [{ ticker: "string", name: "string", shares: "number", currentPrice: "number", value: "number", weight: "number" }],
            lastUpdated: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            portfolioId: "PORT-88210",
            owner: "Alexandra Chen",
            totalValue: 284500,
            currency: "USD",
            ytdReturn: 22840,
            ytdReturnPercent: 8.73,
            holdings: [
              { ticker: "AAPL", name: "Apple Inc.", shares: 120, currentPrice: 215.40, value: 25848, weight: 9.08 },
              { ticker: "MSFT", name: "Microsoft Corp.", shares: 80, currentPrice: 422.15, value: 33772, weight: 11.87 },
            ],
            lastUpdated: "2026-03-05T16:00:00Z",
          },
        },
      },
    ],
  },

  {
    id: "iot-sensors-mcp",
    name: "IoT Sensors MCP",
    category: "IoT",
    description: "Device telemetry, sensor readings, and IoT fleet management",
    color: "#06b6d4",
    endpoints: [
      {
        id: "get-readings",
        name: "Get Sensor Readings",
        path: "/api/v1/sensors/:deviceId/readings",
        method: "GET",
        description: "Returns latest sensor readings",
        expectedSchema: {
          status: "string",
          data: {
            deviceId: "string",
            deviceType: "string",
            location: "string",
            readings: [{ metric: "string", value: "number", unit: "string", timestamp: "string" }],
            batteryLevel: "number",
            connectivity: "string",
            lastSeen: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            deviceId: "SENS-TX-4421",
            deviceType: "environmental_monitor",
            location: "Austin Office Floor 3",
            readings: [
              { metric: "temperature", value: 72.4, unit: "F", timestamp: "2026-03-05T10:00:00Z" },
              { metric: "humidity", value: 45.2, unit: "%", timestamp: "2026-03-05T10:00:00Z" },
              { metric: "co2", value: 612, unit: "ppm", timestamp: "2026-03-05T10:00:00Z" },
            ],
            batteryLevel: 87,
            connectivity: "wifi",
            lastSeen: "2026-03-05T10:01:00Z",
          },
        },
      },
    ],
  },

  {
    id: "project-management-mcp",
    name: "Project Management MCP",
    category: "Productivity",
    description: "Project tracking, sprint management, and team velocity",
    color: "#7c3aed",
    endpoints: [
      {
        id: "get-project",
        name: "Get Project Status",
        path: "/api/v1/projects/:projectId",
        method: "GET",
        description: "Returns project status and metrics",
        expectedSchema: {
          status: "string",
          data: {
            projectId: "string",
            name: "string",
            team: "string",
            lead: "string",
            currentSprint: { id: "string", name: "string", startDate: "string", endDate: "string", velocity: "number" },
            openTasks: "number",
            completedTasks: "number",
            blockers: "number",
            completion: "number",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            projectId: "PROJ-441",
            name: "MCP Validator Platform",
            team: "Platform Engineering",
            lead: "Bharath S",
            currentSprint: { id: "SPR-12", name: "Sprint 12", startDate: "2026-03-03", endDate: "2026-03-17", velocity: 48 },
            openTasks: 22,
            completedTasks: 118,
            blockers: 3,
            completion: 84,
          },
        },
      },
    ],
  },

  {
    id: "car-service-mcp",
    name: "Car Service MCP",
    category: "Automotive",
    description: "Vehicle service scheduling, repair tracking, and parts ordering",
    color: "#3b82f6",
    endpoints: [
      {
        id: "get-service-order",
        name: "Get Service Order",
        path: "/api/v1/service-orders/:soId",
        method: "GET",
        description: "Returns vehicle service order",
        expectedSchema: {
          status: "string",
          data: {
            soId: "string",
            vin: "string",
            customerId: "string",
            services: [{ code: "string", description: "string", labor: "number", parts: "number", total: "number" }],
            advisor: "string",
            technician: "string",
            dropOffDate: "string",
            estimatedReady: "string",
            totalEstimate: "number",
            status: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            soId: "SO-88421",
            vin: "1HGCM82633A004352",
            customerId: "CUST-991",
            services: [
              { code: "OIL-CHANGE", description: "Full synthetic oil change", labor: 0, parts: 65, total: 65 },
              { code: "BRAKE-FRONT", description: "Front brake pad replacement", labor: 120, parts: 85, total: 205 },
            ],
            advisor: "Mike Stevens",
            technician: "Alex Rodriguez",
            dropOffDate: "2026-03-05",
            estimatedReady: "2026-03-05",
            totalEstimate: 270,
            status: "in_progress",
          },
        },
      },
    ],
  },

  {
    id: "dental-clinic-mcp",
    name: "Dental Clinic MCP",
    category: "Healthcare",
    description: "Dental appointments, treatment plans, and billing",
    color: "#ef4444",
    endpoints: [
      {
        id: "get-treatment-plan",
        name: "Get Treatment Plan",
        path: "/api/v1/treatment-plans/:planId",
        method: "GET",
        description: "Returns patient dental treatment plan",
        expectedSchema: {
          status: "string",
          data: {
            planId: "string",
            patientId: "string",
            dentist: "string",
            procedures: [{ code: "string", description: "string", tooth: "string", cost: "number", scheduled: "string", completed: "boolean" }],
            totalCost: "number",
            insuranceCoverage: "number",
            patientResponsibility: "number",
            status: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            planId: "TP-22810",
            patientId: "PAT-5521",
            dentist: "Dr. Rachel Green",
            procedures: [
              { code: "D2160", description: "Amalgam restoration, 3 surfaces", tooth: "19", cost: 280, scheduled: "2026-03-20", completed: false },
              { code: "D1110", description: "Prophylaxis - adult", tooth: "all", cost: 150, scheduled: "2026-03-20", completed: false },
            ],
            totalCost: 430,
            insuranceCoverage: 258,
            patientResponsibility: 172,
            status: "active",
          },
        },
      },
    ],
  },

  {
    id: "event-management-mcp",
    name: "Event Management MCP",
    category: "Events",
    description: "Event planning, ticketing, and attendee management",
    color: "#d946ef",
    endpoints: [
      {
        id: "get-event",
        name: "Get Event Details",
        path: "/api/v1/events/:eventId",
        method: "GET",
        description: "Returns event details and ticket availability",
        expectedSchema: {
          status: "string",
          data: {
            eventId: "string",
            title: "string",
            venue: "string",
            date: "string",
            capacity: "number",
            ticketsSold: "number",
            ticketsAvailable: "number",
            priceRange: { min: "number", max: "number" },
            categories: ["string"],
            organizer: "string",
            status: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            eventId: "EVT-9921",
            title: "Austin Tech Summit 2026",
            venue: "Austin Convention Center",
            date: "2026-04-22",
            capacity: 5000,
            ticketsSold: 3842,
            ticketsAvailable: 1158,
            priceRange: { min: 199, max: 999 },
            categories: ["Technology", "Innovation", "Networking"],
            organizer: "TechEvents Inc.",
            status: "on_sale",
          },
        },
      },
    ],
  },

  {
    id: "ev-charging-mcp",
    name: "EV Charging MCP",
    category: "Automotive",
    description: "EV charging station network, availability, and session management",
    color: "#3b82f6",
    endpoints: [
      {
        id: "get-stations",
        name: "Get Charging Stations",
        path: "/api/v1/stations/nearby",
        method: "GET",
        description: "Returns nearby EV charging stations",
        expectedSchema: {
          status: "string",
          data: {
            stations: [
              { id: "string", name: "string", address: "string", distance: "number", availablePorts: "number", totalPorts: "number", maxKw: "number", pricePerKwh: "number", status: "string" },
            ],
            total: "number",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            stations: [
              { id: "STA-4421", name: "Tesla Supercharger - Domain", address: "11410 Century Oaks Ter, Austin TX", distance: 1.2, availablePorts: 8, totalPorts: 16, maxKw: 250, pricePerKwh: 0.35, status: "operational" },
              { id: "STA-4422", name: "ChargePoint - Whole Foods 6th", address: "525 N Lamar Blvd, Austin TX", distance: 2.4, availablePorts: 2, totalPorts: 4, maxKw: 50, pricePerKwh: 0.29, status: "operational" },
            ],
            total: 24,
          },
        },
      },
    ],
  },

  {
    id: "clinical-trials-mcp",
    name: "Clinical Trials MCP",
    category: "Healthcare",
    description: "Clinical trial management, participant enrollment, and data collection",
    color: "#ef4444",
    endpoints: [
      {
        id: "get-trial",
        name: "Get Trial Status",
        path: "/api/v1/trials/:trialId",
        method: "GET",
        description: "Returns clinical trial status",
        expectedSchema: {
          status: "string",
          data: {
            trialId: "string",
            title: "string",
            phase: "string",
            sponsor: "string",
            enrolled: "number",
            target: "number",
            sites: "number",
            startDate: "string",
            estimatedCompletion: "string",
            status: "string",
            primaryEndpoint: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            trialId: "CT-2026-441",
            title: "Novel Therapy for Type 2 Diabetes Management",
            phase: "Phase III",
            sponsor: "MedResearch Corp",
            enrolled: 1842,
            target: 2000,
            sites: 24,
            startDate: "2025-06-01",
            estimatedCompletion: "2027-12-31",
            status: "recruiting",
            primaryEndpoint: "HbA1c reduction at 24 weeks",
          },
        },
      },
    ],
  },

  {
    id: "mortgage-mcp",
    name: "Mortgage MCP",
    category: "Finance",
    description: "Mortgage applications, loan processing, and amortization",
    color: "#10b981",
    endpoints: [
      {
        id: "get-loan",
        name: "Get Loan Application",
        path: "/api/v1/loans/:loanId",
        method: "GET",
        description: "Returns mortgage loan application",
        expectedSchema: {
          status: "string",
          data: {
            loanId: "string",
            applicant: "string",
            propertyAddress: "string",
            loanAmount: "number",
            downPayment: "number",
            interestRate: "number",
            termYears: "number",
            monthlyPayment: "number",
            loanType: "string",
            creditScore: "number",
            status: "string",
            closingDate: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            loanId: "LOAN-88210",
            applicant: "David and Maria Santos",
            propertyAddress: "456 Oak Ave, Dallas TX 75201",
            loanAmount: 388000,
            downPayment: 97000,
            interestRate: 6.875,
            termYears: 30,
            monthlyPayment: 2548.42,
            loanType: "conventional",
            creditScore: 748,
            status: "in_underwriting",
            closingDate: "2026-04-01",
          },
        },
      },
    ],
  },

  {
    id: "employee-benefits-mcp",
    name: "Employee Benefits MCP",
    category: "Human Resources",
    description: "Benefits enrollment, coverage details, and claims management",
    color: "#8b5cf6",
    endpoints: [
      {
        id: "get-benefits",
        name: "Get Employee Benefits",
        path: "/api/v1/benefits/:employeeId",
        method: "GET",
        description: "Returns employee benefits enrollment",
        expectedSchema: {
          status: "string",
          data: {
            employeeId: "string",
            name: "string",
            enrollmentYear: "number",
            health: { plan: "string", provider: "string", deductible: "number", premium: "number", status: "string" },
            dental: { plan: "string", provider: "string", annualMax: "number", status: "string" },
            vision: { plan: "string", provider: "string", status: "string" },
            retirement: { plan: "string", contributionRate: "number", employerMatch: "number", balance: "number" },
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            employeeId: "EMP-1042",
            name: "Sarah Johnson",
            enrollmentYear: 2026,
            health: { plan: "PPO Gold", provider: "BlueCross", deductible: 1500, premium: 420, status: "active" },
            dental: { plan: "Comprehensive", provider: "Delta Dental", annualMax: 2000, status: "active" },
            vision: { plan: "Basic", provider: "VSP", status: "active" },
            retirement: { plan: "401(k)", contributionRate: 6, employerMatch: 4, balance: 42800 },
          },
        },
      },
    ],
  },

  {
    id: "food-delivery-mcp",
    name: "Food Delivery MCP",
    category: "E-Commerce",
    description: "Food orders, delivery tracking, and restaurant integration",
    color: "#f97316",
    endpoints: [
      {
        id: "get-delivery-order",
        name: "Get Delivery Order",
        path: "/api/v1/delivery/orders/:orderId",
        method: "GET",
        description: "Returns food delivery order status",
        expectedSchema: {
          status: "string",
          data: {
            orderId: "string",
            customerId: "string",
            restaurant: { id: "string", name: "string" },
            items: [{ name: "string", quantity: "number", price: "number" }],
            deliveryAddress: "string",
            driver: { id: "string", name: "string", phone: "string", currentLocation: "string" },
            estimatedDelivery: "string",
            subtotal: "number",
            deliveryFee: "number",
            total: "number",
            status: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            orderId: "DEL-9912",
            customerId: "CUST-334",
            restaurant: { id: "REST-82", name: "Torchy's Tacos" },
            items: [
              { name: "Trailer Park Taco", quantity: 3, price: 9.0 },
              { name: "Queso", quantity: 1, price: 6.5 },
            ],
            deliveryAddress: "123 Main St, Austin TX 78701",
            driver: { id: "DRV-441", name: "Jose Martinez", phone: "+1-512-555-0182", currentLocation: "0.8 miles away" },
            estimatedDelivery: "2026-03-05T19:35:00Z",
            subtotal: 33.5,
            deliveryFee: 3.99,
            total: 40.47,
            status: "out_for_delivery",
          },
        },
      },
    ],
  },

  {
    id: "building-access-mcp",
    name: "Building Access MCP",
    category: "Security",
    description: "Physical access control, badge management, and visitor logs",
    color: "#dc2626",
    endpoints: [
      {
        id: "get-access-log",
        name: "Get Access Log",
        path: "/api/v1/access/log",
        method: "GET",
        description: "Returns building access log entries",
        expectedSchema: {
          status: "string",
          data: {
            entries: [
              { id: "string", personId: "string", name: "string", type: "string", zone: "string", method: "string", timestamp: "string", granted: "boolean" },
            ],
            total: "number",
            date: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            entries: [
              { id: "LOG-88210", personId: "EMP-1042", name: "Sarah Johnson", type: "employee", zone: "Main Office", method: "badge", timestamp: "2026-03-05T08:54:12Z", granted: true },
              { id: "LOG-88211", personId: "VIS-0021", name: "John Visitor", type: "visitor", zone: "Lobby", method: "pin", timestamp: "2026-03-05T09:15:00Z", granted: true },
            ],
            total: 284,
            date: "2026-03-05",
          },
        },
      },
    ],
  },

  {
    id: "agriculture-mcp",
    name: "Agriculture MCP",
    category: "Agriculture",
    description: "Crop monitoring, soil data, irrigation control, and yield prediction",
    color: "#65a30d",
    endpoints: [
      {
        id: "get-field-data",
        name: "Get Field Data",
        path: "/api/v1/fields/:fieldId",
        method: "GET",
        description: "Returns agricultural field data",
        expectedSchema: {
          status: "string",
          data: {
            fieldId: "string",
            name: "string",
            area: "number",
            crop: "string",
            plantDate: "string",
            expectedHarvest: "string",
            soil: { moisture: "number", pH: "number", nitrogen: "number" },
            weather: { temperature: "number", humidity: "number", forecast: "string" },
            yieldEstimate: "number",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            fieldId: "FIELD-TX-441",
            name: "North Field Section A",
            area: 240,
            crop: "Corn",
            plantDate: "2026-04-01",
            expectedHarvest: "2026-09-15",
            soil: { moisture: 42, pH: 6.8, nitrogen: 180 },
            weather: { temperature: 68, humidity: 55, forecast: "partly_cloudy" },
            yieldEstimate: 180,
          },
        },
      },
    ],
  },

  {
    id: "sports-analytics-mcp",
    name: "Sports Analytics MCP",
    category: "Sports",
    description: "Athlete performance, game statistics, and team analytics",
    color: "#f97316",
    endpoints: [
      {
        id: "get-player-stats",
        name: "Get Player Stats",
        path: "/api/v1/players/:playerId/stats",
        method: "GET",
        description: "Returns player performance statistics",
        expectedSchema: {
          status: "string",
          data: {
            playerId: "string",
            name: "string",
            team: "string",
            position: "string",
            season: "string",
            gamesPlayed: "number",
            stats: { points: "number", assists: "number", rebounds: "number", efficiency: "number" },
            injuryStatus: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            playerId: "PLAYER-441",
            name: "Marcus Johnson",
            team: "Austin Aces",
            position: "Point Guard",
            season: "2025-26",
            gamesPlayed: 58,
            stats: { points: 24.8, assists: 8.4, rebounds: 5.1, efficiency: 28.2 },
            injuryStatus: "healthy",
          },
        },
      },
    ],
  },

  {
    id: "library-catalog-mcp",
    name: "Library Catalog MCP",
    category: "Education",
    description: "Book catalog, borrowing records, and digital resource management",
    color: "#a855f7",
    endpoints: [
      {
        id: "get-book",
        name: "Get Book Details",
        path: "/api/v1/catalog/:isbn",
        method: "GET",
        description: "Returns book catalog details",
        expectedSchema: {
          status: "string",
          data: {
            isbn: "string",
            title: "string",
            author: "string",
            publisher: "string",
            year: "number",
            genre: "string",
            totalCopies: "number",
            availableCopies: "number",
            dueDate: "string",
            location: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            isbn: "978-0-13-468599-1",
            title: "Clean Code",
            author: "Robert C. Martin",
            publisher: "Prentice Hall",
            year: 2008,
            genre: "Software Engineering",
            totalCopies: 5,
            availableCopies: 2,
            dueDate: null,
            location: "Section D, Shelf 3",
          },
        },
      },
    ],
  },

  {
    id: "car-rental-mcp",
    name: "Car Rental MCP",
    category: "Automotive",
    description: "Vehicle rental reservations, availability, and return processing",
    color: "#3b82f6",
    endpoints: [
      {
        id: "get-rental",
        name: "Get Rental Reservation",
        path: "/api/v1/rentals/:rentalId",
        method: "GET",
        description: "Returns car rental reservation",
        expectedSchema: {
          status: "string",
          data: {
            rentalId: "string",
            customerId: "string",
            vehicle: { id: "string", make: "string", model: "string", year: "number", category: "string" },
            pickupLocation: "string",
            dropoffLocation: "string",
            pickupDate: "string",
            returnDate: "string",
            days: "number",
            dailyRate: "number",
            totalCost: "number",
            insurance: "string",
            status: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            rentalId: "RENT-55821",
            customerId: "CUST-334",
            vehicle: { id: "VEH-442", make: "Toyota", model: "RAV4", year: 2025, category: "SUV" },
            pickupLocation: "Austin-Bergstrom International Airport",
            dropoffLocation: "Austin-Bergstrom International Airport",
            pickupDate: "2026-03-10",
            returnDate: "2026-03-15",
            days: 5,
            dailyRate: 89.0,
            totalCost: 445.0,
            insurance: "full_coverage",
            status: "confirmed",
          },
        },
      },
    ],
  },

  {
    id: "patient-billing-mcp",
    name: "Patient Billing MCP",
    category: "Healthcare",
    description: "Medical billing, insurance claims, and payment processing",
    color: "#ef4444",
    endpoints: [
      {
        id: "get-invoice",
        name: "Get Medical Invoice",
        path: "/api/v1/billing/invoices/:invoiceId",
        method: "GET",
        description: "Returns patient medical invoice",
        expectedSchema: {
          status: "string",
          data: {
            invoiceId: "string",
            patientId: "string",
            visitDate: "string",
            services: [{ code: "string", description: "string", charge: "number" }],
            totalCharge: "number",
            insuranceAdjustment: "number",
            insurancePaid: "number",
            patientBalance: "number",
            dueDate: "string",
            status: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            invoiceId: "INV-99210",
            patientId: "PAT-9981",
            visitDate: "2026-02-28",
            services: [
              { code: "99213", description: "Office visit, established patient", charge: 250 },
              { code: "93000", description: "Electrocardiogram", charge: 180 },
            ],
            totalCharge: 430,
            insuranceAdjustment: 172,
            insurancePaid: 214,
            patientBalance: 44,
            dueDate: "2026-03-30",
            status: "outstanding",
          },
        },
      },
    ],
  },

  {
    id: "fraud-detection-mcp",
    name: "Fraud Detection MCP",
    category: "Finance",
    description: "Transaction fraud scoring, anomaly detection, and risk assessment",
    color: "#10b981",
    endpoints: [
      {
        id: "score-transaction",
        name: "Score Transaction",
        path: "/api/v1/fraud/score/:transactionId",
        method: "GET",
        description: "Returns fraud risk score for a transaction",
        expectedSchema: {
          status: "string",
          data: {
            transactionId: "string",
            amount: "number",
            merchant: "string",
            riskScore: "number",
            riskLevel: "string",
            flags: ["string"],
            recommendation: "string",
            modelVersion: "string",
            evaluatedAt: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            transactionId: "TXN-88210",
            amount: 4892.0,
            merchant: "Electronics Store #442",
            riskScore: 72,
            riskLevel: "high",
            flags: ["unusual_amount", "new_merchant", "late_night"],
            recommendation: "manual_review",
            modelVersion: "v4.2.1",
            evaluatedAt: "2026-03-05T02:14:22Z",
          },
        },
      },
    ],
  },

  {
    id: "parking-management-mcp",
    name: "Parking Management MCP",
    category: "Automotive",
    description: "Parking lot availability, reservations, and payment processing",
    color: "#3b82f6",
    endpoints: [
      {
        id: "get-parking-availability",
        name: "Get Parking Availability",
        path: "/api/v1/parking/:lotId/availability",
        method: "GET",
        description: "Returns parking lot availability",
        expectedSchema: {
          status: "string",
          data: {
            lotId: "string",
            name: "string",
            address: "string",
            totalSpaces: "number",
            availableSpaces: "number",
            occupancyRate: "number",
            sections: [{ id: "string", type: "string", available: "number", total: "number" }],
            ratePerHour: "number",
            openHours: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            lotId: "LOT-DOWNTOWN-01",
            name: "Congress Ave Parking Garage",
            address: "600 Congress Ave, Austin TX 78701",
            totalSpaces: 800,
            availableSpaces: 142,
            occupancyRate: 82.25,
            sections: [
              { id: "SEC-A", type: "standard", available: 98, total: 400 },
              { id: "SEC-B", type: "compact", available: 32, total: 250 },
              { id: "SEC-C", type: "accessible", available: 12, total: 30 },
            ],
            ratePerHour: 4.0,
            openHours: "24/7",
          },
        },
      },
    ],
  },

  {
    id: "government-permits-mcp",
    name: "Government Permits MCP",
    category: "Government",
    description: "Building permits, license applications, and compliance tracking",
    color: "#475569",
    endpoints: [
      {
        id: "get-permit",
        name: "Get Permit Status",
        path: "/api/v1/permits/:permitId",
        method: "GET",
        description: "Returns permit application status",
        expectedSchema: {
          status: "string",
          data: {
            permitId: "string",
            type: "string",
            applicant: "string",
            address: "string",
            description: "string",
            submittedAt: "string",
            reviewedBy: "string",
            inspections: [{ type: "string", scheduledAt: "string", result: "string" }],
            status: "string",
            expiresAt: "string",
          },
        },
        fakeResponse: {
          status: "success",
          data: {
            permitId: "PRM-2026-8821",
            type: "building_construction",
            applicant: "Austin Construction LLC",
            address: "789 5th Street, Austin TX 78701",
            description: "4-story mixed use commercial building",
            submittedAt: "2026-01-15",
            reviewedBy: "John Davis, Senior Inspector",
            inspections: [
              { type: "foundation", scheduledAt: "2026-03-20", result: "pending" },
            ],
            status: "approved",
            expiresAt: "2027-01-15",
          },
        },
      },
    ],
  },
];

// Utility: get server by ID
export function getMCPServerById(id) {
  return MCP_SERVERS.find((s) => s.id === id) || null;
}

// Utility: get all categories
export function getAllCategories() {
  const cats = [...new Set(MCP_SERVERS.map((s) => s.category))];
  return cats.sort();
}
