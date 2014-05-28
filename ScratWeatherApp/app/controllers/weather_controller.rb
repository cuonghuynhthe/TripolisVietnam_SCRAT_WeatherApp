class WeatherController < ApplicationController
  require 'net/http'
  require 'active_support/json'
  require 'uri'
  def search_weather_by_name
    query = params[:term]
    if query != ''
      query = URI.escape(query)
      units = params[:units]
      if units == nil
        units = 'metric'
      end
      url = "http://api.openweathermap.org/data/2.5/find?q=#{query}&units=#{units}&APPID=7d493d1ebf9bcba3e9877f3f2d816355&mode=json&type=like"
      result = Net::HTTP.get(URI.parse(url))
      json_result = ActiveSupport::JSON.decode(result)
      list = ActiveSupport::JSON.encode(json_result['list'])
      render :json => list
    else
      render :json => nil
    end
  end
  def get_weather_by_id
    id = params[:id]
    units = params[:units]
    if units == nil
      units = 'metric'
    end
    url = "http://api.openweathermap.org/data/2.5/weather?id=#{id}&units=#{units}&APPID=7d493d1ebf9bcba3e9877f3f2d816355&mode=json"
    result = Net::HTTP.get(URI.parse(url))
    json_result = ActiveSupport::JSON.decode(result)
    render :json => json_result
  end
  def get_forecast_by_id
    id = params[:id]
    units = params[:units]
    if units == nil
      units = 'metric'
    end
    url = "http://api.openweathermap.org/data/2.5/forecast/daily?id=#{id}&units=#{units}&APPID=7d493d1ebf9bcba3e9877f3f2d816355&mode=json&cnt=5"
    result = Net::HTTP.get(URI.parse(url))
    json_result = ActiveSupport::JSON.decode(result)
    render :json => json_result['list']
  end
  def get_weather_by_coordinate
    latitude = params[:lat]
    longitude = params[:lon]
    units = params[:units]
    if units == nil
      units = 'metric'
    end
    if units == nil
      units = 'metric'
    end
    url = "http://api.openweathermap.org/data/2.5/weather?lat=#{latitude}&lon=#{longitude}&units=#{units}&APPID=7d493d1ebf9bcba3e9877f3f2d816355&mode=json"
    result = Net::HTTP.get(URI.parse(url))
    json_result = ActiveSupport::JSON.decode(result)
    render :json => json_result
  end
end