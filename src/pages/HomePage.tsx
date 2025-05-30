import React from 'react';
import { Link } from 'react-router-dom';
import { VoteIcon, ShieldCheck, Users, BarChart3 } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                Secure Online <span className="text-blue-600">Voting</span> Made Simple
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                A trusted platform for organizations to conduct transparent and secure elections.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  <Button size="lg" variant="primary">
                    {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                  </Button>
                </Link>
                <Link to="/elections">
                  <Button size="lg" variant="outline">
                    Browse Elections
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-full h-full absolute -top-4 -left-4 border-4 border-blue-200 rounded-xl"></div>
                <div className="bg-white shadow-xl rounded-xl p-6 relative z-10">
                  <VoteIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <h3 className="font-semibold">Board of Directors Election 2025</h3>
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>3 candidates</span>
                        <span>74 votes</span>
                      </div>
                      <div className="mt-3">
                        <div className="bg-gray-200 rounded-full h-2 mb-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: "43%" }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Started 2 days ago</span>
                          <span>5 days remaining</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Button variant="primary" size="sm">Vote Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose VoteHub?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform provides everything you need to run successful, secure, and transparent elections.
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-lg text-blue-600 mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Advanced encryption and authentication protocols ensure vote integrity and voter privacy.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1">
              <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-lg text-green-600 mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Intuitive interface makes it simple to create elections and cast votes from any device.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md hover:-translate-y-1">
              <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-lg text-purple-600 mb-4">
                <BarChart3 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Results</h3>
              <p className="text-gray-600">
                View election results with beautiful visualizations as they happen in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to create and manage your elections.
            </p>
          </div>
          
          <div className="mt-12 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>
            
            <div className="space-y-16">
              <div className="relative">
                <div className="md:flex md:items-center">
                  <div className="md:w-1/2 pr-8 md:text-right">
                    <div className="mb-2 text-blue-600 font-bold">Step 1</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Create an Election</h3>
                    <p className="text-gray-600">
                      Define your election details, add candidates or options, set the voting period, and configure permissions.
                    </p>
                  </div>
                  
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <span className="font-bold">1</span>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:w-1/2 pl-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="border border-dashed border-gray-300 p-3 rounded">
                        <div className="mb-2 text-sm font-medium text-gray-700">Election Title</div>
                        <div className="h-6 bg-gray-100 rounded w-3/4 mb-3"></div>
                        <div className="mb-2 text-sm font-medium text-gray-700">Description</div>
                        <div className="h-12 bg-gray-100 rounded w-full mb-3"></div>
                        <div className="flex space-x-2">
                          <div className="h-8 bg-blue-100 rounded w-1/2"></div>
                          <div className="h-8 bg-blue-100 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="md:flex md:items-center">
                  <div className="md:w-1/2 md:order-last pr-8">
                    <div className="mb-2 text-blue-600 font-bold">Step 2</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Invite Voters</h3>
                    <p className="text-gray-600">
                      Send secure invitations to eligible voters via email with unique access links.
                    </p>
                  </div>
                  
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <span className="font-bold">2</span>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:w-1/2 md:order-first pl-8 md:text-right">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="border border-dashed border-gray-300 p-3 rounded">
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-gray-200 mr-2"></div>
                          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                        </div>
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 rounded-full bg-gray-200 mr-2"></div>
                          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                        </div>
                        <div className="h-8 bg-blue-500 rounded w-1/3 ml-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="md:flex md:items-center">
                  <div className="md:w-1/2 pr-8 md:text-right">
                    <div className="mb-2 text-blue-600 font-bold">Step 3</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Voting Process</h3>
                    <p className="text-gray-600">
                      Voters securely access the platform, review options, and cast their votes with just a few clicks.
                    </p>
                  </div>
                  
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <span className="font-bold">3</span>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:w-1/2 pl-8">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="border border-dashed border-gray-300 p-3 rounded">
                        <div className="h-5 bg-gray-100 rounded w-1/2 mb-3"></div>
                        <div className="space-y-2 mb-3">
                          <div className="h-10 bg-blue-50 border border-blue-300 rounded p-2 flex justify-between items-center">
                            <div className="h-4 w-4 rounded-full border-2 border-blue-500"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          </div>
                          <div className="h-10 bg-white border border-gray-300 rounded p-2 flex justify-between items-center">
                            <div className="h-4 w-4 rounded-full border-2 border-gray-300"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </div>
                        <div className="h-8 bg-blue-500 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="md:flex md:items-center">
                  <div className="md:w-1/2 md:order-last pr-8">
                    <div className="mb-2 text-blue-600 font-bold">Step 4</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">View Results</h3>
                    <p className="text-gray-600">
                      Access comprehensive election results with detailed analytics and visualizations.
                    </p>
                  </div>
                  
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <span className="font-bold">4</span>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:w-1/2 md:order-first pl-8 md:text-right">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="border border-dashed border-gray-300 p-3 rounded">
                        <div className="flex justify-center mb-3">
                          <div className="h-24 w-24 rounded-full border-8 border-blue-500 flex items-center justify-center">
                            <div className="h-12 w-12 rounded-full border-8 border-green-500"></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-2 bg-blue-500 rounded-full w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-full"></div>
                          <div className="h-2 bg-green-500 rounded-full w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
          <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of organizations that trust VoteHub for their election needs.
          </p>
          <div className="mt-8">
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-blue-600 border-white">
                {isAuthenticated ? "Go to Dashboard" : "Create Your First Election"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;