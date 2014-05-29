class WeatherController < ApplicationController
  require 'net/http'
  require 'active_support/json'
  require 'uri'

  def search_weather_by_name
    query = params[:term]
    if query != '' || query == nil
      query = URI.escape(query)
      units = params[:units]
      if units == nil
        units = 'metric'
      end
      #Make a request to the API to get the weather data by searching keyword
      begin
        url = "http://api.openweathermap.org/data/2.5/find?q=#{query}&units=#{units}&APPID=7d493d1ebf9bcba3e9877f3f2d816355&mode=json&type=like"
        result = Net::HTTP.get(URI.parse(url))
        json_result = ActiveSupport::JSON.decode(result)
        list = ActiveSupport::JSON.encode(json_result['list'])
        render :json => list
      rescue
        render :json => {}
      end
    else
      render :json => {}
    end
  end

  def get_weather_by_id
    id = params[:id]
    units = params[:units]
    if units == nil || units == ''
      units = 'metric'
    end
    #Make a request to the API to get weather data by city id
    begin
      url = "http://api.openweathermap.org/data/2.5/weather?id=#{id}&units=#{units}&APPID=7d493d1ebf9bcba3e9877f3f2d816355&mode=json"
      result = Net::HTTP.get(URI.parse(url))
      json_result = ActiveSupport::JSON.decode(result)
      render :json => json_result
    rescue
      render :json => {}
    end

  end

  def get_forecast_by_id
    id = params[:id]
    units = params[:units]
    if units == nil || units == ''
      units = 'metric'
    end
    #Make a request to the API to get the weather forecast data by city id
    begin
      url = "http://api.openweathermap.org/data/2.5/forecast/daily?id=#{id}&units=#{units}&APPID=7d493d1ebf9bcba3e9877f3f2d816355&mode=json&cnt=5"
      result = Net::HTTP.get(URI.parse(url))
      json_result = ActiveSupport::JSON.decode(result)
      render :json => json_result['list']
    rescue
      render :json => {}
    end
  end

  def get_weather_by_coordinate
    latitude = params[:lat]
    longitude = params[:lon]
    units = params[:units]
    if units == nil || units == ''
      units = 'metric'
    end
    #Make a request to the API to get the weather data by current location
    begin
      url = "http://api.openweathermap.org/data/2.5/weather?lat=#{latitude}&lon=#{longitude}&units=#{units}&APPID=7d493d1ebf9bcba3e9877f3f2d816355&mode=json"
      result = Net::HTTP.get(URI.parse(url))
      json_result = ActiveSupport::JSON.decode(result)
      render :json => json_result
    rescue
      render :json => {}
    end
  end
end