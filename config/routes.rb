Rails.application.routes.draw do
  get 'dashboard/:id', to: 'dashboards#index', as: 'user_dashboard'
  get 'dashboard/:id/main_content', to: 'dashboards#main_content'
  get 'dashboard/organization/:org_id', to: 'dashboards#org_dashboard', as: 'organization_dashboard'
  get 'dashboard/project/:proj_id', to: 'dashboards#project_dashboard', as: 'project_dashboard'
  get 'dashboard/ticket/:id', to: 'dashboards#ticket_dashboard', as: 'ticket_dashboard'
  get 'dashboard/organization/manage_roles/:id', to: 'dashboards#manage_roles', as: 'manage_roles_dashboard'
  get 'dashboard/project/manage_team/:id', to: 'dashboards#manage_team', as: 'manage_team_dashboard'
  get 'pages/home'
  get 'pages/help'
  get 'pages/about'
  resources :comments
  resources :histories
  resources :tickets
  resources :team_members
  get 'team_members/project/:id', to: 'team_members#index_team_members'
  resources :projects
  get 'projects/:id/add_ticket', to: 'projects#add_ticket', as: 'add_ticket'
  resources :positions
  get 'positions/organization/:id', to: 'positions#index_org_pos'
  resources :organizations
  devise_for :users, controllers: {
    registrations: 'registrations',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  devise_scope :user do
    get '/users/all' => 'registrations#index'
  end
  root "pages#home"
end
