unicorn_root_path = '/tmp/unicorn/scrat'
worker_processes 4
# working_directory '/tmp/unicorn/weather_api' # available in 0.94.0+
listen "#{unicorn_root_path}/weather.sock", :backlog => 64
# listen 8081, :tcp_nopush => true
timeout 30
pid "#{unicorn_root_path}/weather.pid"
#stderr_path "#{unicorn_root_path}/weather.stderr.log"
#stdout_path "#{unicorn_root_path}/weather.stdout.log"
preload_app true
GC.respond_to?(:copy_on_write_friendly=) and
  GC.copy_on_write_friendly = true
before_fork do |server, worker|
  # defined?(ActiveRecord::Base) and
  #   ActiveRecord::Base.connection.disconnect!
end
after_fork do |server, worker|
  # defined?(ActiveRecord::Base) and
  #   ActiveRecord::Base.establish_connection
end

