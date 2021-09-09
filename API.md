# API Endpoints (tmp)

| Category                                          | Method     | Endpoint                                                                                 |                             |
| ---                                               | ---        | ---                                                                                      | ---                         |
| api_static_collection                             | GET        | /api/static_collection(.:format)                                                         | api/static_collection#index |
| api                                               | POST       | /api/exams/:uuid(.:format)                                                               | api/exams#email |
|                                                   | PATCH      | /api/exams/:uuid(.:format)                                                               | api/exams#show |
| api_skills                                        | GET        | /api/skills(.:format)                                                                    | api/skills#index |
| sign_in_api_users                                 | POST       | /api/users/sign_in(.:format)                                                             | api/authentication#create |
| sign_out_api_users                                | DELETE     | /api/users/sign_out(.:format)                                                            | api/authentication#destroy |
| password_api_users                                | POST       | /api/users/password(.:format)                                                            | api/passwords#create |
|                                                   | PUT        | /api/users/password(.:format)                                                            | api/passwords#update |
| apply_coupon_api_payment_settings                 | POST       | /api/payment_settings/apply_coupon(.:format)                                             | api/payment_settings#apply_coupon |
| api_documents                                     | GET        | /api/projects/:project_id/documents(.:format)                                            | api/project_documents#index |
|                                                   | POST       | /api/projects/:project_id/documents(.:format)                                            | api/project_documents#create |
| api_document                                      | DELETE     | /api/projects/:project_id/documents/:id(.:format)                                        | api/project_documents#destroy |
| api_project_ends                                  | POST       | /api/projects/:project_id/end(.:format)                                                  | api/project_ends#create |
| api_project_end                                   | PATCH      | /api/projects/:project_id/end/:id(.:format)                                              | api/project_ends#update |
|                                                   | PUT        | /api/projects/:project_id/end/:id(.:format)                                              | api/project_ends#update |
| api_project_extensions                            | POST       | /api/projects/:project_id/extension(.:format)                                            | api/project_extensions#create |
| api_project_extension                             | PATCH      | /api/projects/:project_id/extension/:id(.:format)                                        | api/project_extensions#update |
|                                                   | PUT        | /api/projects/:project_id/extension/:id(.:format)                                        | api/project_extensions#update |
| api_project_issues                                | POST       | /api/projects/:project_id/issues(.:format)                                               | api/project_issues#create |
| api_project_rating                                | POST       | /api/projects/:project_id/rating(.:format)                                               | api/project_ratings#create |
| api_settings_general                              | GET        | /api/settings/general(.:format)                                                          | api/settings/general#index |
|                                                   | PATCH      | /api/settings/general(.:format)                                                          | api/settings/general#update |
| api_settings_profile                              | GET        | /api/settings/profile(.:format)                                                          | api/settings/profile#index |
|                                                   | PATCH      | /api/settings/profile(.:format)                                                          | api/settings/profile#update |
| api_settings_password                             | PATCH      | /api/settings/password(.:format)                                                         | api/settings/password#update |
| api_settings_notifications                        | GET        | /api/settings/notifications(.:format)                                                    | api/settings/notifications#index |
|                                                   | PATCH      | /api/settings/notifications(.:format)                                                    | api/settings/notifications#update |
|                                                   | DELETE     | /api/settings/profile(.:format)                                                          | api/settings/profile#destroy |
| api_settings_email                                | POST       | /api/settings/email(.:format)                                                            | api/settings/email#create |
|                                                   | PATCH      | /api/settings/email(.:format)                                                            | api/settings/email#update |
|                                                   | GET        | /api/local_projects/:project_id/messages(.:format)                                       | api/project_messages#index |
|                                                   | POST       | /api/local_projects/:project_id/messages(.:format)                                       | api/project_messages#create |
|                                                   | POST       | /api/local_projects/:project_id/specialists(.:format)                                    | api/local_projects#add_specialist |
|                                                   | DELETE     | /api/local_projects/:project_id/specialists/:specialist_id(.:format)                     | api/local_projects#remove_specialist |
| api_direct_messages                               | GET        | /api/messages/:recipient_id(.:format)                                                    | api/direct_messages#index |
|                                                   | POST       | /api/messages/:recipient_id(.:format)                                                    | api/direct_messages#create |
| api_messages                                      | GET        | /api/messages(.:format)                                                                  | api/direct_messages#show |
| api_project_ratings                               | GET        | /api/project_ratings(.:format)                                                           | api/project_ratings#index |
|                                                   | GET        | /api/reminders/:id(.:format)                                                             | api/reminders#show |
|                                                   | DELETE     | /api/reminders/:id(.:format)                                                             | api/reminders#destroy |
|                                                   | POST       | /api/reminders/:id(.:format)                                                             | api/reminders#update |
|                                                   | GET        | /api/reminders/:id/messages(.:format)                                                    | api/reminder_messages#index |
|                                                   | POST       | /api/reminders/:id/messages(.:format)                                                    | api/reminder_messages#create |
|                                                   | GET        | /api/reminders/:date_from/:date_to(.:format)                                             | api/reminders#by_date |
| api_overdue_reminders                             | GET        | /api/overdue_reminders(.:format)                                                         | api/reminders#overdue |
| api_reminders                                     | POST       | /api/reminders(.:format)                                                                 | api/reminders#create |
| api_local_projects                                | GET        | /api/local_projects(.:format)                                                            | api/local_projects#index |
|                                                   | POST       | /api/local_projects(.:format)                                                            | api/local_projects#create |
| api_local_project                                 | GET        | /api/local_projects/:id(.:format)                                                        | api/local_projects#show |
|                                                   | PATCH      | /api/local_projects/:id(.:format)                                                        | api/local_projects#update |
|                                                   | PUT        | /api/local_projects/:id(.:format)                                                        | api/local_projects#update |
|                                                   | DELETE     | /api/local_projects/:id(.:format)                                                        | api/local_projects#destroy |
|                                                   | PUT        | /api/local_projects/:id/complete(.:format)                                               | api/local_projects#complete |
| api_business_exam_exam_request_exam_request_files | POST       | /api/business/exams/:exam_id/requests/:exam_request_id/documents(.:format)               | api/business/exam_request_files#create |
| api_business_exam_exam_request_exam_request_file  | DELETE     | /api/business/exams/:exam_id/requests/:exam_request_id/documents/:id(.:format)           | api/business/exam_request_files#destroy |
| api_business_exam_exam_requests                   | POST       | /api/business/exams/:exam_id/requests(.:format)                                          | api/business/exam_requests#create |
| api_business_exam_exam_request                    | PATCH      | /api/business/exams/:exam_id/requests/:id(.:format)                                      | api/business/exam_requests#update |
|                                                   | PUT        | /api/business/exams/:exam_id/requests/:id(.:format)                                      | api/business/exam_requests#update |
|                                                   | DELETE     | /api/business/exams/:exam_id/requests/:id(.:format)                                      | api/business/exam_requests#destroy |
| invite_api_business_exam                          | POST       | /api/business/exams/:id/invite(.:format)                                                 | api/business/exams#invite |
| uninvite_api_business_exam                        | POST       | /api/business/exams/:id/uninvite(.:format)                                               | api/business/exams#uninvite |
| api_business_exams                                | GET        | /api/business/exams(.:format)                                                            | api/business/exams#index |
|                                                   | POST       | /api/business/exams(.:format)                                                            | api/business/exams#create |
| api_business_exam                                 | GET        | /api/business/exams/:id(.:format)                                                        | api/business/exams#show |
|                                                   | PATCH      | /api/business/exams/:id(.:format)                                                        | api/business/exams#update |
|                                                   | PUT        | /api/business/exams/:id(.:format)                                                        | api/business/exams#update |
|                                                   | DELETE     | /api/business/exams/:id(.:format)                                                        | api/business/exams#destroy |
| download_folder_api_business_file_folder          | GET        | /api/business/file_folders/:id/download_folder(.:format)                                 | api/business/file_folders#download_folder |
| check_zip_api_business_file_folder                | GET        | /api/business/file_folders/:id/check_zip(.:format)                                       | api/business/file_folders#check_zip |
| list_tree_api_business_file_folder                | GET        | /api/business/file_folders/:id/list_tree(.:format)                                       | api/business/file_folders#list_tree |
| api_business_file_folders                         | GET        | /api/business/file_folders(.:format)                                                     | api/business/file_folders#index |
|                                                   | POST       | /api/business/file_folders(.:format)                                                     | api/business/file_folders#create |
| api_business_file_folder                          | GET        | /api/business/file_folders/:id(.:format)                                                 | api/business/file_folders#show |
|                                                   | PATCH      | /api/business/file_folders/:id(.:format)                                                 | api/business/file_folders#update |
|                                                   | PUT        | /api/business/file_folders/:id(.:format)                                                 | api/business/file_folders#update |
|                                                   | DELETE     | /api/business/file_folders/:id(.:format)                                                 | api/business/file_folders#destroy |
| api_business_file_docs                            | POST       | /api/business/file_docs(.:format)                                                        | api/business/file_docs#create |
| api_business_file_doc                             | PATCH      | /api/business/file_docs/:id(.:format)                                                    | api/business/file_docs#update |
|                                                   | PUT        | /api/business/file_docs/:id(.:format)                                                    | api/business/file_docs#update |
|                                                   | DELETE     | /api/business/file_docs/:id(.:format)                                                    | api/business/file_docs#destroy |
| api_business_compliance_policy_configuration      | GET        | /api/business/compliance_policy_configuration(.:format)                                  | api/business/compliance_policy_configurations#show |
|                                                   | PATCH      | /api/business/compliance_policy_configuration(.:format)                                  | api/business/compliance_policy_configurations#update |
|                                                   | PUT        | /api/business/compliance_policy_configuration(.:format)                                  | api/business/compliance_policy_configurations#update |
| api_business_project_project_messages             | GET        | /api/business/projects/:project_id/messages(.:format)                                    | api/business/project_messages#index |
|                                                   | POST       | /api/business/projects/:project_id/messages(.:format)                                    | api/business/project_messages#create |
| api_business_project_job_application_shortlist    | POST       | /api/business/projects/:project_id/applications/:job_application_id/shortlist(.:format)  | api/business/job_applications#shortlist |
| api_business_project_job_application_hide         | POST       | /api/business/projects/:project_id/applications/:job_application_id/hide(.:format)       | api/business/job_applications#hide |
| api_business_project_job_applications             | GET        | /api/business/projects/:project_id/applications(.:format)                                | api/business/job_applications#index |
| api_business_project_hires                        | POST       | /api/business/projects/:project_id/hires(.:format)                                       | api/business/hires#create |
| api_business_projects                             | GET        | /api/business/projects(.:format)                                                         | api/business/projects#index |
|                                                   | POST       | /api/business/projects(.:format)                                                         | api/business/projects#create |
| api_business_project                              | GET        | /api/business/projects/:id(.:format)                                                     | api/business/projects#show |
|                                                   | PATCH      | /api/business/projects/:id(.:format)                                                     | api/business/projects#update |
|                                                   | PUT        | /api/business/projects/:id(.:format)                                                     | api/business/projects#update |
|                                                   | DELETE     | /api/business/projects/:id(.:format)                                                     | api/business/projects#destroy |
| api_business_compliance_policies_download         | GET        | /api/business/compliance_policies/download(.:format)                                     | api/business/compliance_policies#download_all |
| api_business_compliance_policies_combined_policy  | GET        | /api/business/compliance_policies/combined_policy(.:format)                              | api/business/compliance_policies#combined_policy |
| api_business_compliance_policies                  | GET        | /api/business/compliance_policies(.:format)                                              | api/business/compliance_policies#index |
|                                                   | POST       | /api/business/compliance_policies(.:format)                                              | api/business/compliance_policies#create |
| api_business_compliance_policy                    | GET        | /api/business/compliance_policies/:id(.:format)                                          | api/business/compliance_policies#show |
|                                                   | PATCH      | /api/business/compliance_policies/:id(.:format)                                          | api/business/compliance_policies#update |
|                                                   | PUT        | /api/business/compliance_policies/:id(.:format)                                          | api/business/compliance_policies#update |
|                                                   | DELETE     | /api/business/compliance_policies/:id(.:format)                                          | api/business/compliance_policies#destroy |
| api_business                                      | GET        | /api/business/compliance_policies/:id/publish(.:format)                                  | api/business/compliance_policies#publish |
|                                                   | GET        | /api/business/compliance_policies/:id/download(.:format)                                 | api/business/compliance_policies#download |
| api_business_risks                                | GET        | /api/business/risks(.:format)                                                            | api/business/risks#index |
|                                                   | POST       | /api/business/risks(.:format)                                                            | api/business/risks#create |
| api_business_risk                                 | GET        | /api/business/risks/:id(.:format)                                                        | api/business/risks#show |
|                                                   | PATCH      | /api/business/risks/:id(.:format)                                                        | api/business/risks#update |
|                                                   | PUT        | /api/business/risks/:id(.:format)                                                        | api/business/risks#update |
|                                                   | DELETE     | /api/business/risks/:id(.:format)                                                        | api/business/risks#destroy |
| api_business_project_timesheets                   | GET        | /api/business/projects/:project_id/timesheets(.:format)                                  | api/business/timesheets#index |
|                                                   | POST       | /api/business/projects/:project_id/timesheets(.:format)                                  | api/business/timesheets#create |
| api_business_project_timesheet                    | GET        | /api/business/projects/:project_id/timesheets/:id(.:format)                              | api/business/timesheets#show |
|                                                   | PATCH      | /api/business/projects/:project_id/timesheets/:id(.:format)                              | api/business/timesheets#update |
|                                                   | PUT        | /api/business/projects/:project_id/timesheets/:id(.:format)                              | api/business/timesheets#update |
|                                                   | DELETE     | /api/business/projects/:project_id/timesheets/:id(.:format)                              | api/business/timesheets#destroy |
| api_business_specialist_role                      | PATCH      | /api/business/specialist_roles/:id(.:format)                                             | api/business/specialist_roles#update |
|                                                   | PUT        | /api/business/specialist_roles/:id(.:format)                                             | api/business/specialist_roles#update |
| api_business_specialists                          | GET        | /api/business/specialists(.:format)                                                      | api/business/specialists#index |
| api_business_annual_report_documents              | GET        | /api/business/annual_reports/:annual_report_id/documents(.:format)                       | api/business/annual_report_documents#index |
|                                                   | POST       | /api/business/annual_reports/:annual_report_id/documents(.:format)                       | api/business/annual_report_documents#create |
| api_business_annual_report_document               | DELETE     | /api/business/annual_reports/:annual_report_id/documents/:id(.:format)                   | api/business/annual_report_documents#destroy |
| api_business_annual_reports                       | GET        | /api/business/annual_reports(.:format)                                                   | api/business/annual_reports#index |
|                                                   | POST       | /api/business/annual_reports(.:format)                                                   | api/business/annual_reports#create |
| api_business_annual_report                        | GET        | /api/business/annual_reports/:id(.:format)                                               | api/business/annual_reports#show |
|                                                   | PATCH      | /api/business/annual_reports/:id(.:format)                                               | api/business/annual_reports#update |
|                                                   | PUT        | /api/business/annual_reports/:id(.:format)                                               | api/business/annual_reports#update |
|                                                   | DELETE     | /api/business/annual_reports/:id(.:format)                                               | api/business/annual_reports#destroy |
|                                                   | GET        | /api/business/annual_reports/:id/clone(.:format)                                         | api/business/annual_reports#clone |
| api_business_review_categories                    | GET        | /api/business/annual_reports/:report_id/review_categories(.:format)                      | api/business/review_categories#index |
|                                                   | POST       | /api/business/annual_reports/:report_id/review_categories(.:format)                      | api/business/review_categories#create |
| api_business_review_category                      | PATCH      | /api/business/annual_reports/:report_id/review_categories/:id(.:format)                  | api/business/review_categories#update |
|                                                   | PUT        | /api/business/annual_reports/:report_id/review_categories/:id(.:format)                  | api/business/review_categories#update |
|                                                   | DELETE     | /api/business/annual_reports/:report_id/review_categories/:id(.:format)                  | api/business/review_categories#destroy |
| api_business_ratings                              | GET        | /api/business/ratings(.:format)                                                          | api/business/ratings#index |
| api_business_upgrade_subscribe                    | POST       | /api/business/upgrade/subscribe(.:format)                                                | api/business/upgrade#subscribe |
| api_business_payment_settings                     | GET        | /api/business/payment_settings(.:format)                                                 | api/business/payment_settings#index |
|                                                   | POST       | /api/business/payment_settings(.:format)                                                 | api/business/payment_settings#create |
| api_business_payment_setting                      | PATCH      | /api/business/payment_settings/:id(.:format)                                             | api/business/payment_settings#update |
|                                                   | PUT        | /api/business/payment_settings/:id(.:format)                                             | api/business/payment_settings#update |
|                                                   | DELETE     | /api/business/payment_settings/:id(.:format)                                             | api/business/payment_settings#destroy |
|                                                   | PUT        | /api/business/payment_settings/make_primary/:id(.:format)                                | api/business/payment_settings#make_primary |
| api_business_favorites                            | GET        | /api/business/favorites(.:format)                                                        | api/business/favorites#index |
|                                                   | PATCH      | /api/business/favorites(.:format)                                                        | api/business/favorites#update |
| api_business_financials_processed                 | GET        | /api/business/financials/processed(.:format)                                             | api/business/financials#processed |
| api_business_financials_payments                  | GET        | /api/business/financials/payments(.:format)                                              | api/business/financials#payments |
| api_business_financials_budget                    | GET        | /api/business/financials/budget(.:format)                                                | api/business/financials#get_budget_data |
| api_business_financials_annual_budget             | PATCH      | /api/business/financials/annual_budget(.:format)                                         | api/business/financials#set_annual_budget |
| specialists_api_business_team_members             | GET        | /api/business/team_members/specialists(.:format)                                         | api/business/team_members#specialists |
| archive_api_business_team_member                  | PATCH      | /api/business/team_members/:id/archive(.:format)                                         | api/business/team_members#archive |
| unarchive_api_business_team_member                | PATCH      | /api/business/team_members/:id/unarchive(.:format)                                       | api/business/team_members#unarchive |
| api_business_team_members                         | GET        | /api/business/team_members(.:format)                                                     | api/business/team_members#index |
|                                                   | POST       | /api/business/team_members(.:format)                                                     | api/business/team_members#create |
| api_business_team_member                          | PATCH      | /api/business/team_members/:id(.:format)                                                 | api/business/team_members#update |
|                                                   | PUT        | /api/business/team_members/:id(.:format)                                                 | api/business/team_members#update |
|                                                   | DELETE     | /api/business/team_members/:id(.:format)                                                 | api/business/team_members#destroy |
| available_seat_count_api_business_seats           | GET        | /api/business/seats/available_seat_count(.:format)                                       | api/business/seats#available_seat_count |
| api_specialist_projects_my                        | GET        | /api/specialist/projects/my(.:format)                                                    | api/specialist/projects#my |
| api_specialist_project_project_messages           | GET        | /api/specialist/projects/:project_id/messages(.:format)                                  | api/specialist/project_messages#index |
|                                                   | POST       | /api/specialist/projects/:project_id/messages(.:format)                                  | api/specialist/project_messages#create |
| api_specialist_project_timesheets                 | GET        | /api/specialist/projects/:project_id/timesheets(.:format)                                | api/specialist/timesheets#index |
|                                                   | POST       | /api/specialist/projects/:project_id/timesheets(.:format)                                | api/specialist/timesheets#create |
| api_specialist_project_timesheet                  | GET        | /api/specialist/projects/:project_id/timesheets/:id(.:format)                            | api/specialist/timesheets#show |
|                                                   | PATCH      | /api/specialist/projects/:project_id/timesheets/:id(.:format)                            | api/specialist/timesheets#update |
|                                                   | PUT        | /api/specialist/projects/:project_id/timesheets/:id(.:format)                            | api/specialist/timesheets#update |
|                                                   | DELETE     | /api/specialist/projects/:project_id/timesheets/:id(.:format)                            | api/specialist/timesheets#destroy |
| api_specialist_project_applications_my            | GET        | /api/specialist/projects/:project_id/applications/my(.:format)                           | api/specialist/job_applications#my |
| api_specialist_project_job_applications           | POST       | /api/specialist/projects/:project_id/applications(.:format)                              | api/specialist/job_applications#create |
| api_specialist_project_job_application            | GET        | /api/specialist/projects/:project_id/applications/:id(.:format)                          | api/specialist/job_applications#show |
|                                                   | PATCH      | /api/specialist/projects/:project_id/applications/:id(.:format)                          | api/specialist/job_applications#update |
|                                                   | PUT        | /api/specialist/projects/:project_id/applications/:id(.:format)                          | api/specialist/job_applications#update |
|                                                   | DELETE     | /api/specialist/projects/:project_id/applications/:id(.:format)                          | api/specialist/job_applications#destroy |
| api_specialist_project_local                      | GET        | /api/specialist/projects/:project_id/local(.:format)                                     | api/specialist/projects#local |
| api_specialist_project_calendar_hide              | GET        | /api/specialist/projects/:project_id/calendar_hide(.:format)                             | api/specialist/projects#calendar_hide |
| api_specialist_project_calendar_show              | GET        | /api/specialist/projects/:project_id/calendar_show(.:format)                             | api/specialist/projects#calendar_show |
| api_specialist_projects                           | GET        | /api/specialist/projects(.:format)                                                       | api/specialist/projects#index |
| api_specialist_project                            | GET        | /api/specialist/projects/:id(.:format)                                                   | api/specialist/projects#show |
| api_specialist_payment_settings                   | GET        | /api/specialist/payment_settings(.:format)                                               | api/specialist/payment_settings#index |
| api_specialist_payment_setting                    | DELETE     | /api/specialist/payment_settings/:id(.:format)                                           | api/specialist/payment_settings#destroy |
| api_specialist                                    | PUT        | /api/specialist/payment_settings/validate/:id(.:format)                                  | api/specialist/payment_settings#validate |
| api_specialist_payment_settings_create_card       | POST       | /api/specialist/payment_settings/create_card(.:format)                                   | api/specialist/payment_settings#create_card |
| api_specialist_payment_settings_create_bank       | POST       | /api/specialist/payment_settings/create_bank(.:format)                                   | api/specialist/payment_settings#create_bank |
|                                                   | PUT        | /api/specialist/payment_settings/make_primary/:id(.:format)                              | api/specialist/payment_settings#make_primary |
| api_specialist_upgrade_subscribe                  | POST       | /api/specialist/upgrade/subscribe(.:format)                                              | api/specialist/upgrade#subscribe |
| api_specialist_upgrade_cancel                     | DELETE     | /api/specialist/upgrade/cancel(.:format)                                                 | api/specialist/upgrade#cancel |
| api_specialist_favorites                          | GET        | /api/specialist/favorites(.:format)                                                      | api/specialist/favorites#index |
|                                                   | PATCH      | /api/specialist/favorites(.:format)                                                      | api/specialist/favorites#update |
| api_specialist_share_project                      | POST       | /api/specialist/share_project(.:format)                                                  | api/specialist/share_project#create |
| api_specialist_roles                              | GET        | /api/specialist/roles(.:format)                                                          | api/specialist/roles#index |
| api_specialist_financials_processed               | GET        | /api/specialist/financials/processed(.:format)                                           | api/specialist/financials#processed |
| api_specialist_financials_payments                | GET        | /api/specialist/financials/payments(.:format)                                            | api/specialist/financials#payments |
| api_specialist_financials_revenue                 | GET        | /api/specialist/financials/revenue(.:format)                                             | api/specialist/financials#get_revenue_data |
| api_specialist_financials_annual_revenue          | PATCH      | /api/specialist/financials/annual_revenue(.:format)                                      | api/specialist/financials#set_annual_revenue |
| api_specialist_billings                           | GET        | /api/specialist/billings(.:format)                                                       | api/specialist/billings#index |
|                                                   | POST       | /api/specialist/billings(.:format)                                                       | api/specialist/billings#create |
| api_specialist_billing                            | PATCH      | /api/specialist/billings/:id(.:format)                                                   | api/specialist/billings#update |
|                                                   | PUT        | /api/specialist/billings/:id(.:format)                                                   | api/specialist/billings#update |
| auto_populate_api_businesses                      | PATCH      | /api/businesses/auto_populate(.:format)                                                  | api/businesses#auto_populate |
| api_businesses                                    | POST       | /api/businesses(.:format)                                                                | api/businesses#create |
| current_api_specialists                           | GET        | /api/specialists/current(.:format)                                                       | api/specialists#current |
| api_specialists                                   | POST       | /api/specialists(.:format)                                                               | api/specialists#create |
| api_businesses_current                            | GET        | /api/businesses/current(.:format)                                                        | api/businesses#current |
| update_api_business                               | PATCH      | /api/business(.:format)                                                                  | api/businesses#update |
|                                                   | PATCH      | /api/business(.:format)                                                                  | api/businesses#update |
|                                                   | PUT        | /api/business(.:format)                                                                  | api/businesses#update |
| api_users_confirm_email                           | PUT        | /api/users/confirm_email(.:format)                                                       | api/email_confirmation#update |
| api_users_resend_email                            | GET        | /api/users/resend_email(.:format)                                                        | api/email_confirmation#resend |
| update_api_specialist                             | PATCH      | /api/specialist(.:format)                                                                | api/specialists#update |
|                                                   | PATCH      | /api/specialist(.:format)                                                                | api/specialists#update |
|                                                   | PUT        | /api/specialist(.:format)                                                                | api/specialists#update |
| api_otp_secrets                                   | POST       | /api/otp_secrets(.:format)                                                               | api/otp_secrets#create |