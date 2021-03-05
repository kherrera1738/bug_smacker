Rails.application.routes.draw do
  # Dashboard Urls
  get 'dashboard/:id', to: 'dashboards#index', as: 'user_dashboard'
  get 'dashboard/:id/main_content', to: 'dashboards#main_content'
  get 'dashboard/organization/:org_id', to: 'dashboards#org_dashboard', as: 'organization_dashboard'
  get 'dashboard/project/:proj_id', to: 'dashboards#project_dashboard', as: 'project_dashboard'
  get 'dashboard/ticket/:id', to: 'dashboards#ticket_dashboard', as: 'ticket_dashboard'
  get 'dashboard/organization/manage_roles/:id', to: 'dashboards#manage_roles', as: 'manage_roles_dashboard'
  get 'dashboard/project/manage_team/:id', to: 'dashboards#manage_team', as: 'manage_team_dashboard'
  
  # Trial Organization Urls
  get 'trials/organization', to: 'trials#org_dashboard', as: 'trial_organization'
  get 'trials/edit_organization', to: 'trials#edit_org', as: 'trials_edit_organization'

  # Trial Role Management Urls
  get 'trials/manage_roles', to: 'trials#manage_roles', as: 'trials_manage_roles'
  get 'trials/manage_roles/content', to: 'trials#manage_roles_content'
  post 'trials/positions', to: 'trials#create_position'
  
  # Trial Project Urls
  get 'trials/project/:id', to: 'trials#project_dashboard', as: 'trial_project'
  get 'trials/project/content/:id', to: 'trials#project_content'
  get 'trials/project/:id/add_ticket', to: 'trials#add_ticket', as: 'trials_add_ticket'
  get 'trials/edit_project/:id', to: 'trials#edit_proj', as: 'trails_edit_project'
  
  # Trial Project Management Urls
  get 'trials/project/manage_team/:id', to: 'trials#manage_team', as: 'trials_team_members'
  get 'trials/project/manage_team/:id/team_members', to: 'trials#index_team_members'
  get 'trials/project/manage_team/:id/positions', to: 'trials#index_positions'
  post 'trials/team_members', to: 'trials#add_team_member'
  
  # Trial Ticket Managment Urls 
  get 'trials/ticket/:id', to: 'trials#ticket_dashboard', as: 'trial_ticket'
  get 'trials/ticket/content/:id', to: 'trials#ticket_content'
  get 'trials/ticket/:id/edit', to: 'trials#edit_ticket'
  post 'trials/comments', to: 'trials#comments'
  
  # Static pages
  get 'pages/home'
  get 'pages/help'
  get 'pages/about'
  
  resources :comments, only: [ :create, :update, :destroy ]
  resources :tickets, except: [ :index, :new ]
  resources :team_members, except: [ :index, :show, :new ]
  get 'team_members/project/:id', to: 'team_members#index_team_members'
  resources :projects, except: [ :index, :new ]
  get 'projects/:id/add_ticket', to: 'projects#add_ticket', as: 'add_ticket'
  resources :positions, only: [ :create, :update, :destroy ]
  get 'positions/organization/:id', to: 'positions#index_org_pos', as: 'index_org_pos'
  resources :organizations, except: [ :index, :new ]
  devise_for :users, controllers: {
    registrations: 'registrations',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  devise_scope :user do
    get '/users/all' => 'registrations#index'
  end
  root "pages#home"
end
