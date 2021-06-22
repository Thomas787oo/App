import React, { ReactChildren, ReactElement, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Control, useController } from 'react-hook-form';
import {
    CheckBox, Icon,
    Input,
    Radio,
    RadioGroup,
    Toggle,
} from '@ui-kitten/components';
import { Colors } from '../../../common-styles/colors';
import { Fonts } from '../../../common-styles/fonts';
import {
  FieldTooltip,
  FieldTooltipValidation,
} from './field-tooltip.component';
import * as Haptics from 'expo-haptics';
import { ErrorMessage } from '../error-message/error-message.component';

export const CustomField = (
  props: {
    defaultValue: any;
    name: string;
    control: Control | undefined;
    trigger?: any;
    isFormSubmitted: boolean,
    triggerErrorOnChange?: boolean;
    label: string;
    placeholder?: string;
    labelTextStyle?: object | null;
    children?: ReactChildren | null;
    rules?: object;
    leftIcon?: ReactElement | null;
    onLeftIconPress?: (data?: any) => any;
    rightIcon?: ReactElement | null;
    onRightIconPress?: (data?: any) => any;
    onChange?: (data?: any) => any;
    type?:
      | 'text'
      | 'checkbox'
      | 'radio'
      | 'toggle'
      | 'password'
      | 'hidden';
    disabled?: boolean;
    onFocus?: () => any;
    onBlur?: () => any;
    options?: Array<{
      label: ReactElement;
      labelActive?: ReactElement;
      value: any;
    }>;
    optionsStyle?: object | null;
    selectedOptionsStyle?: object | null;
    textContainerStyle?: object | null;
    tooltipValidation?: FieldTooltipValidation;
    googleMapKey?: string;
  } = {
    defaultValue: '',
    name: '',
    control: undefined,
    trigger: null,
    isFormSubmitted: false,
    triggerErrorOnChange: true,
    label: '',
    placeholder: '',
    labelTextStyle: {},
    children: null,
    rules: {},
    leftIcon: null,
    onLeftIconPress: () => {},
    rightIcon: null,
    onRightIconPress: () => {},
    onChange: () => {},
    type: 'text',
    disabled: false,
    onFocus: () => {},
    onBlur: () => {},
    options: [],
    optionsStyle: {},
    selectedOptionsStyle: {},
    textContainerStyle: {},
    tooltipValidation: undefined,
    googleMapKey: '',
  },
) => {
  const { field, fieldState } = useController({
    control: props.control,
    defaultValue: props.defaultValue,
    name: props.name,
    rules: props.rules,
  });

  const [isFocused, setFocused] = useState(false);
  const [isTouched, setTouched] = useState(false);

  const computeHeight = (validationCount: number) => {
    let minimumHeight = -21;
    minimumHeight -= validationCount * 34;
    return minimumHeight;
  };

  const computeMinHeight = (validationCount: number) => {
    let minimumHeight = 41;
    minimumHeight += validationCount * 34;
    return minimumHeight;
  };

  const triggerErrorsIfNecessary = () => {
    if (
        ((props.triggerErrorOnChange === true ||
        props.triggerErrorOnChange === undefined) &&
      props.trigger !== undefined) &&
      props.isFormSubmitted === true
    ) {
      props.trigger(props.name);
    }
  };

  const getSelectedOption = () => {
    if (props.options !== undefined) {
      const seekResult = props.options.find(
        (option) => option.value === field.value,
      );
      return props.options.length > 0 && seekResult !== undefined
        ? props.options.indexOf(seekResult)
        : 0;
    }
    return 0;
  };

  const BuildView = () => {
    switch (props.type) {
      case 'checkbox':
        return (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <CheckBox
              style={styles.checkBox}
              disabled={props.disabled}
              status='editions-charisma'
              checked={field.value}
              onChange={(data) => {
                if (props.onChange !== undefined) {
                  props.onChange(data);
                }
                field.onChange(data);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                triggerErrorsIfNecessary();
              }}
            />
            <View>
              <Text style={styles.checkBoxLabel}>{props.label}</Text>
              <ErrorMessage error={fieldState.error} />
            </View>
          </View>
        );
      case 'toggle':
        return (
          <Toggle
            style={{ borderRadius: 100, alignItems: 'center', flex: 1 }}
            disabled={props.disabled}
            status='editions-charisma'
            checked={field.value.checked}
            onChange={(data) => {
              if (props.onChange !== undefined) {
                props.onChange(data);
              }
              field.onChange(data);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              triggerErrorsIfNecessary();
            }}
          >
            {() => (
              <>
                {props.label ? (
                  <Text
                    style={[props.labelTextStyle ? props.labelTextStyle : null]}
                  >
                    {props.label}
                  </Text>
                ) : null}
                {props.children ? <Text>{props.children}</Text> : null}
              </>
            )}
          </Toggle>
        );
      case 'radio':
        return (
          <RadioGroup
            selectedIndex={getSelectedOption()}
            onChange={(index) => {
              if (
                props.options !== undefined &&
                props.options[index] !== undefined
              ) {
                if (props.onChange !== undefined) {
                  props.onChange(props.options[index].value);
                }
                field.onChange(props.options[index].value);
              }
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              triggerErrorsIfNecessary();
            }}
          >
            {props.options !== undefined && props.options.length > 0
              ? props.options.map((option) => (
                  <Radio
                    status='editions-charisma'
                    style={[
                      props.optionsStyle ? props.optionsStyle : null,
                      field.value === option.value && props.selectedOptionsStyle
                        ? props.selectedOptionsStyle
                        : null,
                    ]}
                  >
                    {() => (
                      <View style={styles.radioLabel}>
                        {field.value === option.value
                          ? option.labelActive !== undefined
                            ? option.labelActive
                            : option.label
                          : null}
                        {field.value !== option.value && option.label
                          ? option.label
                          : null}
                      </View>
                    )}
                  </Radio>
                ))
              : undefined}
          </RadioGroup>
        );
      case 'hidden':
        return (
          <>
            <Input
              style={styles.hiddenFormInput}
              value={field.value}
              onFocus={() => {
                setFocused(true);
                if (props.onFocus) {
                  props.onFocus();
                }
              }}
            />
          </>
        );
      case 'password':
      case 'text':
      default:
        return (
          <View style={props.textContainerStyle} >
            <View style={[styles.labelContainer]}>
              <Text style={styles.labelStyle}>{props.label}</Text>
            </View>

            <View style={styles.formInputContainer}>
                    <Input
                      placeholder={props.placeholder ? props.placeholder : undefined}
                      style={styles.formInput}
                      textStyle={[
                        styles.textStyle,
                        {
                          fontSize: props.type === 'password' && field.value !== '' ? 25 : 14,
                        },
                      ]}
                      placeholderTextColor={Colors.greyInactive}
                      size='large'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={props.type === 'password'}
                      value={field.value}
                      accessoryLeft={() => (
                          <TouchableOpacity onPress={props.onLeftIconPress}>
                              {props.leftIcon}
                          </TouchableOpacity>
                      )}
                      accessoryRight={() => (
                          <TouchableOpacity onPress={props.onRightIconPress}>
                              {props.rightIcon}
                          </TouchableOpacity>
                      )}
                      onFocus={() => {
                        setFocused(true);
                        if (props.onFocus) {
                          props.onFocus();
                        }
                      }}
                      onBlur={() => {
                        setFocused(false);
                        if (props.onBlur) {
                          props.onBlur();
                        }
                      }}
                      onEndEditing={(data) => {}}
                      onChangeText={(data) => {
                        if (props.onChange !== undefined) {
                          props.onChange(data);
                        }
                        field.onChange(data);
                        triggerErrorsIfNecessary();
                      }}
                    />
            </View>

           <ErrorMessage error={fieldState.error} />

            {props.tooltipValidation !== undefined ? (
              <View
                style={[
                  styles.tooltip,
                  styles.hidden,
                  isFocused && field.value !== '' && styles.visibleTooltips,
                  {
                    marginBottom: computeHeight(
                      Object.keys(props.tooltipValidation).length,
                    ),
                    minHeight: computeMinHeight(
                      Object.keys(props.tooltipValidation).length,
                    ),
                  },
                ]}
              >
                <FieldTooltip
                  value={field.value}
                  validation={props.tooltipValidation}
                />
              </View>
            ) : null}
          </View>
        );
    }
  };

  return <>{BuildView()}</>;
};

const styles = StyleSheet.create({
  invalidField: {
    borderBottomColor: '#e52d2e94',
  },
  formInputContainer: {
    backgroundColor: Colors.white,
    marginTop: 8,
    height: 50,
    paddingRight: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  formInput: {
    borderColor: 'transparent',
    height: 43,
    width: '100%',
    backgroundColor: 'transparent',
  },
  hiddenFormInput: {
    height: 0,
    width: 0,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  hidden: {
    display: 'none',
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: 'white',
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  labelStyle: {
    color: Colors.white,
    fontFamily: Fonts.montserratMedium,
    fontSize: 12,
  },
  textStyle: {
    color: Colors.black,
    fontFamily: Fonts.montserratMedium,
    fontSize: 12,
  },
  errorText: {
    color: Colors.white,
    fontSize: 11,
    textAlign: 'left',
    height: 12,
    fontFamily: Fonts.montserratMedium,
  },
  checkBox: {
    marginRight: 6,
    marginTop: 3,
  },
  checkBoxLabel: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: Fonts.montserratMedium,
    color: Colors.legacyGrey50,
  },
  tooltip: {
    marginTop: -17,
    display: 'flex',
  },
  visibleTooltips: {
    display: 'flex',
    elevation: 10,
    zIndex: 1001,
    flex: 1,
  },
  radioLabel: {
    marginLeft: 10,
  },
});
