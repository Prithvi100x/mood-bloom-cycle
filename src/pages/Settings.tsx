
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  Moon, 
  Lock, 
  HelpCircle, 
  FileText, 
  UserCircle, 
  Calendar 
} from 'lucide-react';
import AppNavbar from '@/components/AppNavbar';
import { useTheme } from '@/hooks/useTheme';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container px-4 py-6 max-w-md mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Customize your app experience
          </p>
        </header>

        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-6">
            {/* Account Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCircle size={20} />
                  <span>Account</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">Profile Information</h3>
                    <p className="text-sm text-muted-foreground">Manage your personal details</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">Export Data</h3>
                    <p className="text-sm text-muted-foreground">Download your tracking history</p>
                  </div>
                  <Button variant="outline" size="sm">Export</Button>
                </div>
              </CardContent>
            </Card>

            {/* Cycle Preferences Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>Cycle Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">Average Cycle Length</h3>
                    <p className="text-sm text-muted-foreground">Customize your cycle length</p>
                  </div>
                  <Button variant="outline" size="sm">28 Days</Button>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">Average Period Length</h3>
                    <p className="text-sm text-muted-foreground">Set your typical period duration</p>
                  </div>
                  <Button variant="outline" size="sm">5 Days</Button>
                </div>
              </CardContent>
            </Card>

            {/* Notifications Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell size={20} />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">Period Reminders</h3>
                    <p className="text-sm text-muted-foreground">Remind me before my period starts</p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">Daily Check-in</h3>
                    <p className="text-sm text-muted-foreground">Remind me to log my mood</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">Food Recommendations</h3>
                    <p className="text-sm text-muted-foreground">Suggest foods based on my cycle</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Appearance Card with Dark Mode Toggle */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon size={20} />
                  <span>Appearance</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">Dark Mode</h3>
                    <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                  </div>
                  <Switch 
                    checked={theme === 'dark'} 
                    onCheckedChange={toggleTheme}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock size={20} />
                  <span>Privacy & Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">App Lock</h3>
                    <p className="text-sm text-muted-foreground">Require authentication to open app</p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">Data Storage</h3>
                    <p className="text-sm text-muted-foreground">Store data locally only</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Help & Support Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle size={20} />
                  <span>Help & Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>FAQs</span>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Contact Support</span>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Privacy Policy</span>
                </Button>
                
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Terms of Service</span>
                </Button>
              </CardContent>
            </Card>

            <div className="py-4 text-center">
              <p className="text-sm text-muted-foreground">MoodBloom v1.0.0</p>
              <p className="text-xs text-muted-foreground mt-1">© 2025 MoodBloom</p>
            </div>
          </div>
        </ScrollArea>
      </div>
      
      <AppNavbar />
    </div>
  );
};

export default SettingsPage;
