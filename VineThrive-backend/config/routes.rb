Rails.application.routes.draw do
  resources :stages
  resources :plants
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :plants do
    resources :stages 
  end

end