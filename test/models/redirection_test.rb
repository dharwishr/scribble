# frozen_string_literal: true

require "test_helper"

class RedirectionTest < ActiveSupport::TestCase
  def setup
    @redirection = create(:redirection)
  end

  def test_redirection_from_should_not_be_valid_without_from
    @redirection.from = ""
    assert_not @redirection.valid?
  end

  def test_redirection_from_and_to_should_not_be_valid_when_whitespace_input
    @redirection.from = " "
    @redirection.to = " "
    assert_not @redirection.valid?
  end

  def test_from_and_to_should_not_be_same
    @redirection.from = "test"
    @redirection.to = "test"
    assert_not @redirection.valid?
  end

  def test_simple_nested_loop_redirection
    r2 = Redirection.create! from: @redirection.to, to: "redirection_page_1"
    r3 = Redirection.create! from: r2.to, to: "redirection_page_3"
    r4 = Redirection.new from: r3.to, to: @redirection.from
    assert_not r4.valid?
    assert_equal [t("redirection.redirection_loop")], r4.errors.full_messages
  end

  def test_mutiple_redirection_with_some_common_values
    r1 = Redirection.create! from: "redirection_page_1", to: "redirection_page_2"
    r2 = Redirection.create! from: r1.to, to: "redirection_page_4"
    r4 = Redirection.create! from: r2.to, to: "redirection_page_6"
    r3 = Redirection.create! from: "redirection_page_3", to: "redirection_page_5"
    r5 = build(:redirection, from: r3.to, to: r1.from)
    assert r5.valid?
  end
end
