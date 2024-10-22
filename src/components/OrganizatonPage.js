import { useState } from "react";
import { Button } from "./ui/button"; // Adjusted path
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"; // Adjusted path
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"; // Adjusted path
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"; // Adjusted path
import { BarChart3, Users, FolderKanban, Settings, Edit, Eye } from "lucide-react";

export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [organizationName, setOrganizationName] = useState("Acme Corporation");
  const [organizationDescription, setOrganizationDescription] = useState(
    "Technology & Innovation"
  );

  const handleProfileUpdate = () => {
    // Logic for updating the organization profile
    console.log("Updated:", { organizationName, organizationDescription });
  };

  return (
    <div className="flex">
      
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Organization Logo" />
              <AvatarFallback>OL</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{organizationName}</h1>
              <p className="text-gray-600">{organizationDescription}</p>
            </div>
          </div>
          <div>
            <Button size="sm" onClick={handleProfileUpdate}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users className="mr-2 h-4 w-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="projects">
              <FolderKanban className="mr-2 h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Organization Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{organizationDescription}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>New project "AI Assistant" launched</li>
                  <li>5 new members joined the organization</li>
                  <li>Quarterly report submitted</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Organization Members</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Here you can manage and view all members of the organization.</p>
                {/* You can add a table or list of members here */}
                <ul className="space-y-2">
                  <li>Member 1</li>
                  <li>Member 2</li>
                  <li>Member 3</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p>View and manage all ongoing and completed projects.</p>
                {/* You can add a grid or list of projects here */}
                <ul className="space-y-2">
                  <li>Project A</li>
                  <li>Project B</li>
                  <li>Project C</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Organization Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Manage organization settings, permissions, and configurations.</p>
                {/* You can add settings form or options here */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
