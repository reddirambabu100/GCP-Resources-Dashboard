// Data.js - Function to return project data with added fields (id, project, service, type, name, status, createdDate, cost, cpu, memory)
const Data = () => {
  // Simulating the data source (project data array)
  const projectData = [
    {
      name: "Project Alpha",
      services: [
        {
          service: "Compute",
          resources: [
            {
              id: "Project Alpha-Compute-VM Instances-1",
              project: "Project Alpha",
              service: "Compute",
              type: "VM Instances",
              name: "VM Instances 1",
              status: "Running",
              createdDate: "2023-01-01",
              cost: "$50",
              cpu: [
                { time: "10:00", usage: 25 },
                { time: "10:05", usage: 40 },
                { time: "10:10", usage: 55 },
                { time: "10:15", usage: 50 },
                { time: "10:20", usage: 35 }
              ],
              memory: [
                { time: "10:00", usage: 45 },
                { time: "10:05", usage: 55 },
                { time: "10:10", usage: 75 },
                { time: "10:15", usage: 70 },
                { time: "10:20", usage: 60 }
              ]
            },
            {
              id: "Project Alpha-Compute-Kubernetes Clusters-2",
              project: "Project Alpha",
              service: "Compute",
              type: "Kubernetes Clusters",
              name: "Kubernetes Clusters 2",
              status: "Stopped",
              createdDate: "2023-01-02",
              cost: "$100",
              cpu: [
                { time: "10:00", usage: 30 },
                { time: "10:05", usage: 45 },
                { time: "10:10", usage: 60 },
                { time: "10:15", usage: 55 },
                { time: "10:20", usage: 40 }
              ],
              memory: [
                { time: "10:00", usage: 50 },
                { time: "10:05", usage: 65 },
                { time: "10:10", usage: 80 },
                { time: "10:15", usage: 75 },
                { time: "10:20", usage: 65 }
              ]
            },
            {
              id: "Project Alpha-Compute-VM Instances-3",
              project: "Project Alpha",
              service: "Compute",
              type: "VM Instances",
              name: "VM Instances 3",
              status: "Running",
              createdDate: "2023-01-10",
              cost: "$75",
              cpu: [
                { time: "10:00", usage: 20 },
                { time: "10:05", usage: 40 },
                { time: "10:10", usage: 60 },
                { time: "10:15", usage: 55 },
                { time: "10:20", usage: 50 }
              ],
              memory: [
                { time: "10:00", usage: 50 },
                { time: "10:05", usage: 60 },
                { time: "10:10", usage: 70 },
                { time: "10:15", usage: 65 },
                { time: "10:20", usage: 55 }
              ]
            }
          ]
        },
        {
          service: "Storage",
          resources: [
            {
              id: "Project Alpha-Storage-Cloud Storage-1",
              project: "Project Alpha",
              service: "Storage",
              type: "Cloud Storage",
              name: "Cloud Storage 1",
              status: "Available",
              createdDate: "2023-02-01",
              cost: "$150",
              cpu: [
                { time: "10:00", usage: 20 },
                { time: "10:05", usage: 30 },
                { time: "10:10", usage: 40 },
                { time: "10:15", usage: 35 },
                { time: "10:20", usage: 25 }
              ],
              memory: [
                { time: "10:00", usage: 35 },
                { time: "10:05", usage: 45 },
                { time: "10:10", usage: 55 },
                { time: "10:15", usage: 50 },
                { time: "10:20", usage: 40 }
              ]
            },
            {
              id: "Project Alpha-Storage-Bigtable-2",
              project: "Project Alpha",
              service: "Storage",
              type: "Bigtable",
              name: "Bigtable 2",
              status: "Running",
              createdDate: "2023-03-01",
              cost: "$200",
              cpu: [
                { time: "10:00", usage: 30 },
                { time: "10:05", usage: 50 },
                { time: "10:10", usage: 60 },
                { time: "10:15", usage: 55 },
                { time: "10:20", usage: 45 }
              ],
              memory: [
                { time: "10:00", usage: 50 },
                { time: "10:05", usage: 65 },
                { time: "10:10", usage: 75 },
                { time: "10:15", usage: 70 },
                { time: "10:20", usage: 60 }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Project Beta",
      services: [
        {
          service: "Compute",
          resources: [
            {
              id: "Project Beta-Compute-VM Instances-1",
              project: "Project Beta",
              service: "Compute",
              type: "VM Instances",
              name: "VM Instances 1",
              status: "Running",
              createdDate: "2023-02-05",
              cost: "$70",
              cpu: [
                { time: "10:00", usage: 20 },
                { time: "10:05", usage: 30 },
                { time: "10:10", usage: 40 },
                { time: "10:15", usage: 50 },
                { time: "10:20", usage: 45 }
              ],
              memory: [
                { time: "10:00", usage: 40 },
                { time: "10:05", usage: 50 },
                { time: "10:10", usage: 60 },
                { time: "10:15", usage: 55 },
                { time: "10:20", usage: 50 }
              ]
            }
          ]
        },
        {
          service: "Networking",
          resources: [
            {
              id: "Project Beta-Networking-VPC Networks-1",
              project: "Project Beta",
              service: "Networking",
              type: "VPC Networks",
              name: "VPC Networks 1",
              status: "Running",
              createdDate: "2023-03-10",
              cost: "$50",
              cpu: [
                { time: "10:00", usage: 15 },
                { time: "10:05", usage: 25 },
                { time: "10:10", usage: 35 },
                { time: "10:15", usage: 30 },
                { time: "10:20", usage: 20 }
              ],
              memory: [
                { time: "10:00", usage: 30 },
                { time: "10:05", usage: 40 },
                { time: "10:10", usage: 50 },
                { time: "10:15", usage: 45 },
                { time: "10:20", usage: 35 }
              ]
            }
          ]
        }
      ]
    },
    // More projects can be added here...
  ];

  // Return the project data with additional fields
  return projectData;
}

export default Data;
